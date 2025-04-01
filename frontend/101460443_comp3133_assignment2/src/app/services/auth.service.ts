import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_USER } from '../graphql/user.queries';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // Provides the service globally
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.apollo
      .watchQuery({
        query: LOGIN_USER,
        variables: { usernameOrEmail, password },
      })
      .valueChanges.pipe(
        map((result: any) => {
          localStorage.setItem('token', result.data.login.token);
          return result.data.login;
        })
      );
  }
}
