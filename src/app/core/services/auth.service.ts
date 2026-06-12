import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment.local';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl; // tu backend

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((res: any) => {
        const token = res?.data?.token ?? res?.token;
        if (token) {
          localStorage.setItem('token', token);
        }
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUserId(): string | null {
    return this.decodeToken()?.sub ?? null;
  }

  getCurrentUserEmail(): string | null {
    return this.decodeToken()?.email ?? null;
  }

  getCurrentRoleId(): string | null {
    return this.decodeToken()?.role ?? null;
  }

  private decodeToken(): { sub: string; email: string; role: string } | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
}
