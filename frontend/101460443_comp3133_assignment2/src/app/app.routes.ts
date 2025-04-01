import { Routes, provideRouter, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './services/auth.service';

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

// Resolver Function to Fetch Employee IDs
const fetchEmployeeIds = async () => {
  const apollo = inject(Apollo); // Proper Angular Injection
  try {
    const result = await firstValueFrom(apollo.query<{ employees: { id: string }[] }>({ query: GET_EMPLOYEE_IDS }));
    return result?.data?.employees.map((employee) => ({ id: employee.id })) || [];
  } catch (error) {
    console.error('Error fetching employee IDs:', error);
    return [];
  }
};

 
// Auth Guard to Protect Routes
const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.isAuthenticated();
};

// Define Routes
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'employees/add', component: AddEmployeeComponent, canActivate: [authGuard] },
  { 
    path: 'employees/update/:id', 
    component: UpdateEmployeeComponent,
    canActivate: [authGuard],
    resolve: { prerenderIds: fetchEmployeeIds }
  },
  { 
    path: 'employees/details/:id', 
    component: EmployeeDetailsComponent,
    canActivate: [authGuard],
    resolve: { prerenderIds: fetchEmployeeIds }
  }
];

// Provide Router in main.ts
export const appConfig = [
  provideRouter(routes)
];
