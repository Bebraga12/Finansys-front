import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const loggedIn = sessionStorage.getItem('finansys_logged') === 'true';
  if (loggedIn) return true;
  inject(Router).navigate(['/login']);
  return false;
};
