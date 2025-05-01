import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      console.error('Error occurred:', error);

      if (error.status === 403) {
        router.navigate(['/sign-in']);
      }

      return throwError(() => error);
    })
  );
};
