import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private graphqlUrl = 'http://localhost:5000/graphql';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const mutation = `
      mutation {
        login(email: "${email}", password: "${password}") {
          success
          token
        }
      }
    `;
    return this.http.post(this.graphqlUrl, { query: mutation });
  }
}
