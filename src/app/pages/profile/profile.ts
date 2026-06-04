import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FinancialService } from '../../core/services/financial';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  protected svc = inject(FinancialService);
  private route = inject(ActivatedRoute);

  showPlansModal = signal(false);

  get user() { return this.svc.currentUser(); }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('openPlans') === 'true') {
      this.showPlansModal.set(true);
    }
  }

  openModal()  { this.showPlansModal.set(true);  }
  closeModal() { this.showPlansModal.set(false); }

  isPlan(plan: string): boolean {
    return this.user.plan === plan;
  }

  selectPlan(plan: string): void {
    if (this.isPlan(plan)) return;
    this.svc.updatePlan(plan);
    this.closeModal();
  }
}
