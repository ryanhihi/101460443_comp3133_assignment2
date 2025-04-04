import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {
  employeeList: any[] = [];
  editingId: string | null = null;
  selectedEmployee: any = null;
  updatedEmployee: any = {};

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    const GET_EMPLOYEES = gql`
      query {
        employees {
          id
          firstName
          lastName
          email
          gender
          designation
          salary
          dateOfJoining
          department
          employeePhoto
          timestamps
        }
      }
    `;

    this.apollo.watchQuery<any>({
      query: GET_EMPLOYEES,
    }).valueChanges.subscribe(({ data }) => {
      this.employeeList = data.employees;
    });
  }

  viewDetails(employee: any) {
    this.selectedEmployee = employee;
    this.editingId = null;
  }

  enableEdit(employee: any) {
    this.editingId = employee.id;
    this.updatedEmployee = { ...employee };
    this.selectedEmployee = null;
  }

  cancelEdit() {
    this.editingId = null;
    this.updatedEmployee = {};
  }

  updateEmployee() {
    const UPDATE_EMPLOYEE = gql`
      mutation UpdateEmployee(
        $id: ID!
        $firstName: String!
        $lastName: String!
        $email: String!
        $gender: String
        $designation: String
        $salary: String
        $dateOfJoining: String
        $department: String
      ) {
        updateEmployee(
          id: $id
          firstName: $firstName
          lastName: $lastName
          email: $email
          gender: $gender
          designation: $designation
          salary: $salary
          dateOfJoining: $dateOfJoining
          department: $department
        ) {
          id
        }
      }
    `;

    this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: this.updatedEmployee,
    }).subscribe(() => {
      alert('Employee updated!');
      this.fetchEmployees();
      this.cancelEdit();
    });
  }

  deleteEmployee(id: string) {
    const DELETE_EMPLOYEE = gql`
      mutation DeleteEmployee($id: ID!) {
        deleteEmployee(id: $id) {
          id
        }
      }
    `;

    if (confirm('Are you sure you want to delete this employee?')) {
      this.apollo.mutate({
        mutation: DELETE_EMPLOYEE,
        variables: { id },
      }).subscribe(() => {
        alert('Employee deleted!');
        this.fetchEmployees();
      });
    }
  }
}
