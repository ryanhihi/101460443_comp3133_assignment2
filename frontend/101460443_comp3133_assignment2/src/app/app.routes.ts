import { Routes, provideRouter } from '@angular/router';
import { inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { firstValueFrom } from 'rxjs';

// Import components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';

// GraphQL Query to fetch employee IDs
const GET_EMPLOYEE_IDS = gql`
  query {
    employees {
      id
    }
  }
`;

// Function to fetch employee IDs
const fetchEmployeeIds = async (): Promise<{ id: string }[]> => {
  const apollo = inject(Apollo);
  try {
    const result = await firstValueFrom(apollo.query<{ employees: { id: string }[] }>({ query: GET_EMPLOYEE_IDS }));
    return result?.data?.employees.map((employee) => ({ id: employee.id })) || [];
  } catch (error) {
    console.error('Error fetching employee IDs:', error);
    return [];
  }
};

// Define Routes
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/add', component: AddEmployeeComponent },
  { 
    path: 'employees/update/:id', 
    component: UpdateEmployeeComponent, 
    data: { prerenderIds: fetchEmployeeIds }
  },
  { 
    path: 'employees/details/:id', 
    component: EmployeeDetailsComponent, 
    data: { prerenderIds: fetchEmployeeIds }
  }
];

// Provide Router in main.ts
export const appConfig = [
  provideRouter(routes)
];
