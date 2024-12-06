import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('authToken');
  const loggedUser = localStorage.getItem('loggedUser');

  if (token && loggedUser) {
    const user = JSON.parse(loggedUser);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!user || !user.username) {
      console.warn('Usuário inconsistente ou não autenticado.');
    }
  }

  return next(req);
};
