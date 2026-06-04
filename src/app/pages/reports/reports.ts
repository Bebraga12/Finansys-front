import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FinancialService } from '../../core/services/financial';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule, CurrencyPipe, RouterLink],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports {
  protected svc = inject(FinancialService);

  selectedCategory = signal('');

  get isBasic(): boolean {
    return this.svc.currentUser().plan === 'BASIC';
  }

  get isPremiumPlus(): boolean {
    return this.svc.currentUser().plan === 'PREMIUM_PLUS';
  }

  get monthlyData() {
    return this.svc.monthlyReport();
  }

  get categoryData() {
    return this.svc.allExpensesByCategory();
  }

  get filteredTransactions() {
    const cat = this.selectedCategory();
    if (!cat) return this.svc.transactions();
    return this.svc.transactions().filter(t => t.category === cat);
  }

  get allCategories(): string[] {
    return [...new Set(this.svc.transactions().map(t => t.category))].sort();
  }

  maxBarValue(data: { income: number; expense: number }[]): number {
    return Math.max(...data.map(d => Math.max(d.income, d.expense)));
  }

  barH(value: number, max: number): number {
    return Math.round((value / max) * 100);
  }

  totalInYear(key: 'income' | 'expense'): number {
    return this.monthlyData.reduce((sum, row) => sum + row[key], 0);
  }
}
