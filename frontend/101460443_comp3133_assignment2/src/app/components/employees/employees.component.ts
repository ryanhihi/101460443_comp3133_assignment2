import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { EmployeeService } from '../../graphql/employee.queries';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {
  iewMode: 'list' | 'add' | 'edit' = 'list';
  employeeList: any[] = [];
  editingEmployee: any = null;  // To track which employee is being edited
  newEmployee: any = {}; // For adding new employee
  searchInput: string = '';
  showAddEmployeeForm: boolean = false;

  constructor(private apollo: Apollo, private employeeService: EmployeeService) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  // Fetch all employees
  fetchEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        this.employeeList = response.data.getAllEmployees;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
  }

  // Edit employee
  editEmployee(employee: any) {
    this.editingEmployee = { ...employee };  // Copy employee data to the editingEmployee object
  }

  // Cancel edit
  cancelEdit() {
    this.editingEmployee = null;  // Hide the edit form
  }

  // Update employee
  updateEmployee() {
    this.employeeService.updateEmployeeById(this.editingEmployee.id, this.editingEmployee).subscribe({
      next: () => {
        alert('Employee updated!');
        this.fetchEmployees();  // Refresh the employee list
        this.cancelEdit();  // Hide the form
      },
      error: (error) => {
        console.error('Error updating employee:', error);
      }
    });
  }

  // Add a new employee
  addEmployee() {
    this.employeeService.addEmployee(this.newEmployee).subscribe({
      next: () => {
        alert('Employee added!');
        this.fetchEmployees();  // Refresh employee list
        this.showAddEmployeeForm = false;  // Hide the add employee form
      },
      error: (error) => {
        console.error('Error adding employee:', error);
      }
    });
  }

  // Delete employee by ID
  deleteEmployeeById(employeeId: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployeeById(employeeId).subscribe({
        next: () => {
          alert('Employee deleted!');
          this.fetchEmployees();  // Refresh employee list
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
        }
      });
    }
  }

  // Search employees by designation or department
  searchEmployeeByDesignationOrDepartment(input: string) {
    this.employeeService.searchEmployeeByDesignationOrDepartment(input).subscribe({
      next: (response) => {
        this.employeeList = response.data.searchEmployeeByDesignationOrDepartment;
      },
      error: (error) => {
        console.error('Error searching employees:', error);
      }
    });
  }
}
