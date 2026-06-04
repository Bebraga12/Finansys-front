import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FinancialService } from '../../core/services/financial';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected svc = inject(FinancialService);

  get isPremiumPlus(): boolean {
    return this.svc.currentUser().plan === 'PREMIUM_PLUS';
  }

  get currentMonthIncomes() {
    return this.svc.currentMonthTransactions.filter(t => t.type === 'income');
  }

  get currentMonthExpenses() {
    return this.svc.currentMonthTransactions.filter(t => t.type === 'expense');
  }

  get activeGoals() {
    return this.svc.goals().filter(g => g.status === 'active').length;
  }

  get recentTransactions() {
    return this.svc.currentMonthTransactions.slice(0, 10);
  }

  get expensesByCategory() {
    return this.svc.expensesByCategory().slice(0, 6);
  }

  get monthlyReport() {
    return this.svc.monthlyReport();
  }

  get maxBarValue(): number {
    return Math.max(...this.monthlyReport.map(m => Math.max(m.income, m.expense)));
  }

  barH(value: number): number {
    return Math.round((value / this.maxBarValue) * 100);
  }
}
