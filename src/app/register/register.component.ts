import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  credentials = {
    email: '',
    password: ''
  }
  
  registerInfo = '';
  loginFlag: boolean ;

  constructor(
    private router: Router,
    private authService: AuthService
    ) {this.loginFlag = true; }


  register() {
    this.authService.register(this.credentials)
      .then(() => this.registerInfo = 'ACCOUNT CREATED, PLEASE LOGIN IN!')
      .catch(err => console.log(err.message));
  }
}

