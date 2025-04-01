import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_USER } from '../graphql/user.queries';
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
      })
      .valueChanges.pipe(
        map((result: any) => {
          if (result.data && result.data.login.token) {
            localStorage.setItem(this.tokenKey, result.data.login.token);
            return result.data.login;
          }
          throw new Error('Invalid login response');
        }),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError(() => new Error('Login failed. Please try again.'));
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
