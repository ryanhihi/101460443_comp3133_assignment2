import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


//import the components
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';    
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';

//Define route array
export const routes: Routes = [
    {path: '', component: SignupComponent},
    {path: 'login', component:LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'employees', component: EmployeeListComponent},
    {path: 'employees/add', component: AddEmployeeComponent},
    {path: 'employees/update/:id', component: UpdateEmployeeComponent},
    {path: 'employees/details/:id', component: EmployeeDetailsComponent}
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}

