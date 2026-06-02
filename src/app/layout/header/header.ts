import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FinancialService } from '../../core/services/financial';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router = inject(Router);
  private financialService = inject(FinancialService);

  get userName(): string {
    return this.financialService.currentUser.name;
  }

  logout(): void {
    sessionStorage.removeItem('finansys_logged');
    this.router.navigate(['/login']);
  }
}
