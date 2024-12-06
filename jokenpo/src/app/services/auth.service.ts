import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-in`, { username, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.accessToken);
        localStorage.setItem('loggedUser', JSON.stringify(response.user));
      }),
    );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('authToken');
    if (!token) return new Observable((observer) => observer.next(false));

    return this.http.post(`${this.apiUrl}/validate`, { token }).pipe(
      tap((response: any) => {
        if (!response.valid) {
          this.logout();
        }
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedUser');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getLoggedUser(): any | null {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : null;
  }
}
