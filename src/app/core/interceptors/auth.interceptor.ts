import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('finansys_token');

  const authReq = token
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    : req;

  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401 && !req.url.includes('/auth/')) {
        localStorage.removeItem('finansys_token');
        inject(Router).navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
