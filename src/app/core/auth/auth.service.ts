import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../../shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_API = 'assets/user.json';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<string> {
    // Symulacja logowania - w rzeczywistej aplikacji wywołalibyśmy API
    return of(this.generateToken()).pipe(
      tap(token => {
        localStorage.setItem(this.TOKEN_KEY, token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserData(): Observable<User> {
    if (!this.isLoggedIn()) {
      return throwError(() => new Error('Użytkownik nie jest zalogowany'));
    }
    return this.http.get<User>(this.USER_API);
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}