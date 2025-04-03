import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getEmployees(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          employees {
            id
            name
            email
            position
            profilePicture
          }
        }
      `
    }).valueChanges;
  }
}
