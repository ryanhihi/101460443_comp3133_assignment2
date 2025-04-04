// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_USER } from '../graphql/user.queries';
import { SIGNUP_USER } from '../graphql/user.queries';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private apollo: Apollo) {}

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.apollo
      .watchQuery({
        query: LOGIN_USER,
        variables: { usernameOrEmail, password },
        fetchPolicy: 'no-cache' // Avoid cached login response
      })
      .valueChanges.pipe(
        map((result: any) => {
          const token = result?.data?.login?.token;
          const user = result?.data?.login?.user;
          if (token && user) {
            localStorage.setItem(this.tokenKey, token);
            return { token, user };
          }
          throw new Error('Invalid login response');
        }),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError(() => new Error('Login failed. Please try again.'));
        })
      );
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: SIGNUP_USER,
        variables: { username, email, password },
      })
      .pipe(
        map((result: any) => result?.data?.signup),
        catchError(error => {
          console.error('Signup failed:', error);
          return throwError(() => new Error('Signup failed. Please try again.'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
