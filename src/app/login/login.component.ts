import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {
  credentials = {
    email: '',
    password: ''
  }
  loginType = 1;
  registerInfo = '';
  loginFlag: boolean ;

  constructor(
    private router: Router,
    private authService: AuthService
    ) {this.loginFlag = true; }

  setLoginType(value: any) {
    this.loginType = value;
  }

  login() {
    this.authService.login(this.loginType, this.credentials)
      .then(() => this.router.navigate(['/Home']))
      .catch(err => alert("Niepoprawny adres email lub hasło!"));

  
  }

  register() {
    this.authService.register(this.credentials)
      .then(() => this.registerInfo = 'ACCOUNT CREATED!')
      .catch(err => console.log(err.message));
  }
  signUp(): void{
    this.loginFlag = false;
  }
  changeToLogIn(): void{
    this.loginFlag = true;
  }
}

