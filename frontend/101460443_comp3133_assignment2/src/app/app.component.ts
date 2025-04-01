import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule, Validators } from '@angular/forms';
import { LOGIN_USER, SIGNUP_USER } from './graphql/user.queries';
import { Apollo } from 'apollo-angular';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,
            FormsModule,ReactiveFormsModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Employment Management App - Assignment 2';

  users: any[] = [];
  error: any;

  loginForm = new FormGroup({
    

  });

  
}
