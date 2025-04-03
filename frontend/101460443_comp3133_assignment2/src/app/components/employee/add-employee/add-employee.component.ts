import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent {
  name = '';
  email = '';
  position = '';

  constructor(private apollo: Apollo) {}

  addEmployee() {
    const ADD_EMPLOYEE = gql`
      mutation AddEmployee($name: String!, $email: String!, $position: String!) {
        addEmployee(name: $name, email: $email, position: $position) {
          id
        }
      }
    `;

    this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: { name: this.name, email: this.email, position: this.position }
    }).subscribe(() => alert('Employee added!'));
  }
}
