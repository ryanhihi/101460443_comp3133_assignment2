import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../graphql/employee.queries';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(result => {
      this.employees = result.data.employees;
    });
  }

  
}
