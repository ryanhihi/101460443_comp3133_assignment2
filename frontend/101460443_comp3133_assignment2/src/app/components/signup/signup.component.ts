import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService, // Inject AuthService 
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signup(): void {
    const { username, email, password } = this.signupForm.value;
    this.authService.signup(username, email, password).subscribe({
      next: (data) => {
        // After successful signup, navigate to Employees page
        this.router.navigate(['/employee']);
      },
      error: (err) => {
        this.errorMessage = 'An error occurred during signup. Please try again.';
      },
    });
  }
}
