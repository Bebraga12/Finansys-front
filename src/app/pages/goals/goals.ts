import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancialService } from '../../core/services/financial';
import { Goal } from '../../core/models/goal';

@Component({
  selector: 'app-goals',
  imports: [CommonModule, FormsModule, CurrencyPipe, DatePipe],
  templateUrl: './goals.html',
  styleUrl: './goals.scss',
})
export class Goals {
  protected svc = inject(FinancialService);

  showForm = signal(false);

  form = {
    title: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: '',
    status: 'active' as Goal['status'],
  };

  progress(goal: Goal): number {
    return Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
  }

  openForm(): void {
    this.form = { title: '', targetAmount: 0, currentAmount: 0, deadline: '', status: 'active' };
    this.showForm.set(true);
  }

  save(): void {
    if (!this.form.title || !this.form.targetAmount || !this.form.deadline) return;
    this.svc.addGoal({ ...this.form });
    this.showForm.set(false);
  }

  delete(id: string): void {
    this.svc.deleteGoal(id);
  }

  cancel(): void {
    this.showForm.set(false);
  }
}
