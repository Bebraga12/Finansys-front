import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction';
import { User } from '../models/user';
import { Category } from '../models/category';
import { Goal } from '../models/goal';
import { environment } from '../../../environments/environment';

// ── Backend response shapes ────────────────────────────────────────────────────

interface ApiTransaction {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  category?: { id: string; name: string; incomeEnabled: boolean; expenseEnabled: boolean };
  description?: string;
  date: string;
}

interface ApiCategory {
  id: string;
  name: string;
  incomeEnabled: boolean;
  expenseEnabled: boolean;
}

interface ApiGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  progressPercent: number;
}

interface ApiUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  createdAt: string;
}

// ── Default categories to seed on first login ─────────────────────────────────

const DEFAULT_CATEGORIES: { name: string; incomeEnabled: boolean; expenseEnabled: boolean }[] = [
  { name: 'Salário',           incomeEnabled: true,  expenseEnabled: false },
  { name: 'Freelance',         incomeEnabled: true,  expenseEnabled: false },
  { name: 'Investimentos',     incomeEnabled: true,  expenseEnabled: false },
  { name: 'Outros (Receita)',  incomeEnabled: true,  expenseEnabled: false },
  { name: 'Moradia',           incomeEnabled: false, expenseEnabled: true  },
  { name: 'Alimentação',       incomeEnabled: false, expenseEnabled: true  },
  { name: 'Transporte',        incomeEnabled: false, expenseEnabled: true  },
  { name: 'Saúde',             incomeEnabled: false, expenseEnabled: true  },
  { name: 'Educação',          incomeEnabled: false, expenseEnabled: true  },
  { name: 'Lazer',             incomeEnabled: false, expenseEnabled: true  },
  { name: 'Contas e Serviços', incomeEnabled: false, expenseEnabled: true  },
  { name: 'Vestuário',         incomeEnabled: false, expenseEnabled: true  },
  { name: 'Outros (Despesa)',  incomeEnabled: false, expenseEnabled: true  },
];

// ──────────────────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class FinancialService {
  private http = inject(HttpClient);
  private readonly api = environment.apiUrl;

  // Internal category name → backend id map (used when sending transactions)
  private categoryNameToId = new Map<string, string>();

  // ── Public state ──────────────────────────────────────────────────────────

  private readonly _currentUser = signal<User>({ id: '', name: '', email: '', plan: 'BASIC', createdAt: '', joinedAt: '' });
  readonly currentUser = this._currentUser.asReadonly();

  private readonly _categories = signal<Category[]>([]);
  readonly categories = this._categories.asReadonly();

  private readonly _transactions = signal<Transaction[]>([]);
  readonly transactions = this._transactions.asReadonly();

  private readonly _goals = signal<Goal[]>([]);
  readonly goals = this._goals.asReadonly();

  // ── Load all data ──────────────────────────────────────────────────────────

  loadAll(): void {
    this.loadCurrentUser();
    this.loadCategories();
    this.loadTransactions();
    this.loadGoals();
  }

  private loadCurrentUser(): void {
    this.http.get<ApiUser>(`${this.api}/auth/me`).subscribe({
      next: u => { this._currentUser.set(this.toUser(u)); },
    });
  }

  private loadCategories(): void {
    this.http.get<ApiCategory[]>(`${this.api}/categories`).subscribe({
      next: cats => {
        if (cats.length === 0) {
          this.seedDefaultCategories();
        } else {
          this.applyCategories(cats);
        }
      },
    });
  }

  private loadTransactions(): void {
    this.http.get<ApiTransaction[]>(`${this.api}/transactions`).subscribe({
      next: txs => this._transactions.set(txs.map(t => this.toTransaction(t))),
    });
  }

  private loadGoals(): void {
    this.http.get<ApiGoal[]>(`${this.api}/goals`).subscribe({
      next: goals => this._goals.set(goals.map(g => this.toGoal(g))),
    });
  }

  private seedDefaultCategories(): void {
    let created = 0;
    const total = DEFAULT_CATEGORIES.length;
    const result: ApiCategory[] = [];

    DEFAULT_CATEGORIES.forEach(cat => {
      this.http.post<ApiCategory>(`${this.api}/categories`, cat).subscribe({
        next: c => {
          result.push(c);
          created++;
          if (created === total) this.applyCategories(result);
        },
      });
    });
  }

  private applyCategories(cats: ApiCategory[]): void {
    this._categories.set(cats.map(c => this.toCategory(c)));
    this.categoryNameToId.clear();
    cats.forEach(c => this.categoryNameToId.set(c.name, c.id));
  }

  // ── Computed getters ──────────────────────────────────────────────────────

  get incomes(): Transaction[] {
    return this._transactions().filter(t => t.type === 'income');
  }

  get expenses(): Transaction[] {
    return this._transactions().filter(t => t.type === 'expense');
  }

  get currentMonthTransactions(): Transaction[] {
    const now = new Date();
    const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return this._transactions().filter(t => t.date.startsWith(prefix));
  }

  get totalIncomes(): number {
    return this.currentMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((s, t) => s + t.value, 0);
  }

  get totalExpenses(): number {
    return this.currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((s, t) => s + t.value, 0);
  }

  get balance(): number {
    return this.totalIncomes - this.totalExpenses;
  }

  // ── Mutation methods ──────────────────────────────────────────────────────

  addTransaction(t: Omit<Transaction, 'id'>): void {
    const categoryId = this.categoryNameToId.get(t.category) ?? null;
    const body = {
      type: t.type.toUpperCase(),
      amount: t.value,
      categoryId,
      description: t.description,
      date: t.date,
    };
    this.http.post<ApiTransaction>(`${this.api}/transactions`, body).subscribe({
      next: created => this._transactions.update(list => [this.toTransaction(created), ...list]),
    });
  }

  deleteTransaction(id: string): void {
    this.http.delete(`${this.api}/transactions/${id}`).subscribe({
      next: () => this._transactions.update(list => list.filter(t => t.id !== id)),
    });
  }

  updateTransaction(updated: Transaction): void {
    const categoryId = this.categoryNameToId.get(updated.category) ?? null;
    const body = {
      type: updated.type.toUpperCase(),
      amount: updated.value,
      categoryId,
      description: updated.description,
      date: updated.date,
    };
    this.http.put<ApiTransaction>(`${this.api}/transactions/${updated.id}`, body).subscribe({
      next: saved =>
        this._transactions.update(list =>
          list.map(t => (t.id === updated.id ? this.toTransaction(saved) : t))
        ),
    });
  }

  addGoal(g: Omit<Goal, 'id'>): void {
    const body = {
      title: g.title,
      targetAmount: g.targetAmount,
      currentAmount: g.currentAmount,
      deadline: g.deadline,
    };
    this.http.post<ApiGoal>(`${this.api}/goals`, body).subscribe({
      next: created => this._goals.update(list => [...list, this.toGoal(created)]),
    });
  }

  deleteGoal(id: string): void {
    this.http.delete(`${this.api}/goals/${id}`).subscribe({
      next: () => this._goals.update(list => list.filter(g => g.id !== id)),
    });
  }

  depositGoal(id: string, amount: number): void {
    this.http.post<ApiGoal>(`${this.api}/goals/${id}/deposit`, { amount }).subscribe({
      next: updated =>
        this._goals.update(list =>
          list.map(g => (g.id === id ? this.toGoal(updated) : g))
        ),
    });
  }

  addCategory(name: string, incomeEnabled: boolean, expenseEnabled: boolean): void {
    this.http.post<ApiCategory>(`${this.api}/categories`, { name, incomeEnabled, expenseEnabled }).subscribe({
      next: created => {
        const cat = this.toCategory(created);
        this._categories.update(list => [...list, cat]);
        this.categoryNameToId.set(created.name, created.id);
      },
    });
  }

  updatePlan(plan: string): void {
    this.http.patch<ApiUser>(`${this.api}/plans/current`, { plan }).subscribe({
      next: updated => {
        this._currentUser.update(u => ({ ...u, plan: updated.plan }));
      },
    });
  }

  // ── Computed methods ──────────────────────────────────────────────────────

  expensesByCategory(): { category: string; total: number; percent: number }[] {
    return this.buildCategoryBreakdown(
      this.currentMonthTransactions.filter(t => t.type === 'expense')
    );
  }

  allExpensesByCategory(): { category: string; total: number; percent: number }[] {
    return this.buildCategoryBreakdown(
      this._transactions().filter(t => t.type === 'expense')
    );
  }

  monthlyReport(): { month: string; income: number; expense: number; balance: number }[] {
    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const now = new Date();
    const months: { key: string; label: string }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
        label: labels[d.getMonth()],
      });
    }

    return months.map(m => {
      const txs = this._transactions().filter(t => t.date.startsWith(m.key));
      const income  = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.value, 0);
      const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.value, 0);
      return { month: m.label, income, expense, balance: income - expense };
    });
  }

  // ── Private transformers ──────────────────────────────────────────────────

  private toTransaction(t: ApiTransaction): Transaction {
    return {
      id: t.id,
      type: t.type === 'INCOME' ? 'income' : 'expense',
      value: t.amount,
      category: t.category?.name ?? '',
      description: t.description ?? '',
      date: t.date,
    };
  }

  private toCategory(c: ApiCategory): Category {
    let type: 'income' | 'expense' | 'both' = 'expense';
    if (c.incomeEnabled && c.expenseEnabled) type = 'both';
    else if (c.incomeEnabled) type = 'income';
    else type = 'expense';
    return { id: c.id, name: c.name, type };
  }

  private toGoal(g: ApiGoal): Goal {
    const today = new Date().toISOString().split('T')[0];
    let status: 'active' | 'completed' | 'failed' = 'active';
    if (g.progressPercent >= 100) status = 'completed';
    else if (g.deadline < today) status = 'failed';
    return {
      id: g.id,
      title: g.title,
      targetAmount: g.targetAmount,
      currentAmount: g.currentAmount,
      deadline: g.deadline,
      status,
    };
  }

  private toUser(u: ApiUser): User {
    const createdAt = u.createdAt ?? '';
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      plan: u.plan ?? 'BASIC',
      createdAt,
      joinedAt: createdAt,
    };
  }

  private buildCategoryBreakdown(
    txs: Transaction[]
  ): { category: string; total: number; percent: number }[] {
    const map = new Map<string, number>();
    txs.forEach(e => map.set(e.category, (map.get(e.category) ?? 0) + e.value));
    const total = txs.reduce((s, t) => s + t.value, 0);
    if (total === 0) return [];
    return Array.from(map.entries())
      .map(([category, t]) => ({ category, total: t, percent: Math.round((t / total) * 100) }))
      .sort((a, b) => b.total - a.total);
  }
}
