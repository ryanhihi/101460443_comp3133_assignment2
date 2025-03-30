import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthServices } from ;

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string ='';

  constructor() {}

  login() {
    
  }

}
