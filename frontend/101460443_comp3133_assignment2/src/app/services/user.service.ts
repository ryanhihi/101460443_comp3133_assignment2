import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SIGNUP_USER } from '../graphql/user.queries';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apollo: Apollo) {}

  signup(username: string, email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: SIGNUP_USER,
      variables: { username, email, password }
    });
  }
}
