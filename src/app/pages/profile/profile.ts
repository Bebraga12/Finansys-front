import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FinancialService } from '../../core/services/financial';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  protected svc = inject(FinancialService);

  showPlansModal = signal(false);

  get user() { return this.svc.currentUser; }

  openModal()  { this.showPlansModal.set(true);  }
  closeModal() { this.showPlansModal.set(false); }
}
