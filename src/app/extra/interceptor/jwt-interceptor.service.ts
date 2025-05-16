import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { SigninService } from '../../services/auth/signin/signin.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const signinService = inject(SigninService);
  const token = signinService.userToken;

  if (token) {
      console.log('Token ' + token);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
