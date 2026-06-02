import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancialService } from '../../core/services/financial';
import { Transaction } from '../../core/models/transaction';

@Component({
  selector: 'app-incomes',
  imports: [CommonModule, FormsModule, CurrencyPipe, DatePipe],
  templateUrl: './incomes.html',
  styleUrl: './incomes.scss',
})
export class Incomes {
  protected svc = inject(FinancialService);

  showForm = signal(false);
  editingId = signal<string | null>(null);

  form = {
    description: '',
    value: 0,
    category: '',
    date: new Date().toISOString().split('T')[0],
  };

  get incomeCategories() {
    return this.svc.categories.filter(c => c.type === 'income');
  }

  openForm(): void {
    this.form = { description: '', value: 0, category: '', date: new Date().toISOString().split('T')[0] };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  edit(t: Transaction): void {
    this.form = { description: t.description, value: t.value, category: t.category, date: t.date };
    this.editingId.set(t.id);
    this.showForm.set(true);
  }

  save(): void {
    if (!this.form.description || !this.form.value || !this.form.category) return;
    const id = this.editingId();
    if (id) {
      this.svc.updateTransaction({ ...this.form, id, type: 'income' });
    } else {
      this.svc.addTransaction({ ...this.form, type: 'income' });
    }
    this.showForm.set(false);
  }

  delete(id: string): void {
    this.svc.deleteTransaction(id);
  }

  cancel(): void {
    this.showForm.set(false);
  }
}
