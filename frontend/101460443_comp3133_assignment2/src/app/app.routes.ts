import { Routes } from '@angular/router';

// Import components
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';



// Define Routes
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'employee', component: EmployeesComponent, canActivate: [authGuard]}
];

