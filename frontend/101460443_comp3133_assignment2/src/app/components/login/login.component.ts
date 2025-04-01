import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,  // 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule] 
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  // Use inject to inject the dependencies (since we're standalone)
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { usernameOrEmail, password } = this.loginForm.value;

    // Simulate authentication (replace with real API call)
    if (usernameOrEmail === 'admin' && password === 'password') {
      this.router.navigate(['/dashboard']); // Redirect after successful login
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
