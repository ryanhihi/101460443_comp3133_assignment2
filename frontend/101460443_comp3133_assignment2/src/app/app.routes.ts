import { Routes, provideRouter, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

// Import components
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeesComponent } from './components/employees/employees.component';

// Auth Guard to Protect Routes
const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.isAuthenticated();
};

// Define Routes
export const routes: Routes = [
  {
    path: '', 
    component: HomeComponent, 
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'employees', component: EmployeesComponent, canActivate: [authGuard] },
    ]
  }
];

// Provide Router in main.ts
export const appConfig = [
  provideRouter(routes)
];
