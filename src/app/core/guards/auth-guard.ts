import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { FinancialService } from '../services/financial';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('finansys_token');
  if (token) {
    const svc = inject(FinancialService);
    if (svc.categories().length === 0) svc.loadAll();
    return true;
  }
  inject(Router).navigate(['/login']);
  return false;
};
