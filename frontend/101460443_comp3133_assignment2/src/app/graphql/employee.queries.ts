import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  //get all employees
  getEmployees(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getAllEmployees {
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
            createdAt
            updatedAt
          }
        }
      `
    }).valueChanges;
  }

  //search Employee by Id
  searchEmployeeById(eid: String): Observable<any> {
    return this.apollo.query({
      query: gql`
        query($eid: ID!) {
        searchEmployeeById(eid: $eid){
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
            createdAt
            updatedAt
          }
        }
          `,
          variables: { eid }
    });


  }

  //Search employee by Designation or Department
  searchEmployeeByDesignationOrDepartment(input: String): Observable<any> {
    return this.apollo.query({
      query: gql `
        query($designationOrDepartment: String) {
        searchEmployeeByDesignationOrDepartment(designationOrDepartment: $designationOrDepartment) {
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
            createdAt
            updatedAt
          }
        }
          `,
          variables: { designationOrDepartment: input }
    });
  }

  //Add Employee
  addEmployee(employee: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql `
        mutation(
        $id: ID!
          $firstName: String!
          $lastName: String!
          $email: String!
          $gender: String!
          $designation: String!
          $salary: Float!
          $dateOfJoining: String!
          $department: String!
          $employeePhoto: String
          ) {
          addEmployee(
          id: $id
            firstName: $firstName
            lastName: $lastName
            email: $email
            gender: $gender
            designation: $designation
            salary: $salary
            dateOfJoining: $dateOfJoining
            department: $department
            employeePhoto: $employeePhoto
            ){
            id
            firstName
              }
            }
          `,
          variables: employee
    });
  }

  //update employee by Id
  updateEmployeeById(eid: string, updates: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation(
          $eid: ID!
          $firstName: String
          $lastName: String
          $email: String
          $gender: String
          $designation: String
          $salary: Float
          $dateOfJoining: String
          $department: String
          $employeePhoto: String
        ) {
          updateEmployeeById(
            eid: $eid
            firstName: $firstName
            lastName: $lastName
            email: $email
            gender: $gender
            designation: $designation
            salary: $salary
            dateOfJoining: $dateOfJoining
            department: $department
            employeePhoto: $employeePhoto
          ) {
            id
            firstName
          }
        }
      `,
      variables: {
        eid,
        ...updates
      }
    });
  }

  // Delete Employee
  deleteEmployeeById(eid: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation($eid: ID!) {
          deleteEmployeeById(eid: $eid) {
            id
            firstName
          }
        }
      `,
      variables: { eid }
    });
  }

}
