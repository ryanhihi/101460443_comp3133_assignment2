import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html'
})
export class UpdateEmployeeComponent {
  id!: string;
  name = '';
  email = '';
  position = '';

  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  updateEmployee() {
    const UPDATE_EMPLOYEE = gql`
      mutation UpdateEmployee($id: ID!, $name: String!, $email: String!, $position: String!) {
        updateEmployee(id: $id, name: $name, email: $email, position: $position) {
          id
        }
      }
    `;

    this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: { id: this.id, name: this.name, email: this.email, position: this.position }
    }).subscribe(() => alert('Employee updated!'));
  }
}
