import { Component } from '@angular/core';
import {Apollo } from 'apollo-angular';
import { LOGIN_USER } from '../../graphql/user.queries';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  title = 'Login Page';
  usernameOrEmail =  '';
  password = '';
  error: string | null = null;

  constructor(private apollo: Apollo) {}

  login() {

    this.apollo
    .watchQuery({
      query: LOGIN_USER,
      variables: {
        usernameOrEmail: this.usernameOrEmail,
        password: this.password,
      },
    })
    .valueChanges.subscribe(
      (result: any) => {
        console.log('Login successful:', result.data.login);
        localStorage.setItem('token', result.data.login.token);
      },
      (error) => {
        this.error = error.message;
      }
    );
  }

}
