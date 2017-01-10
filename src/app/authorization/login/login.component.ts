import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms'
import  { LoginResponse } from '../../model/login_response.model'
import { AuthorizationService } from '../../services/authorization.service'


@Component({

  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['../../../assets/css/authorization.component.css'],
  providers: [AuthorizationService]
})

export class LoginComponent implements OnInit{
  formLogin: FormGroup;
  errorMessage: any;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private authServise: AuthorizationService) { }

  ngOnInit(){
    if(this.authServise.userIsLoggedIn())
      this.router.navigate([''])
    //build form and validate inputs
    this.formLogin =this.builder.group({
      username:['', [
        Validators.minLength(4),
        Validators.maxLength(24),
        Validators.required
      ]],
      password: ['', [
        Validators.minLength(4),
        Validators.maxLength(24),
        Validators.required
      ]]
    })
  }

  login() {
    if(this.formLogin.valid){
      let name = this.formLogin.value.username
      let password = this.formLogin.value.password
      //send request to api for login
      this.authServise.loginUser(name, password)
          .subscribe(resp => this.getMessageResponse(resp),
            error => this.errorMessage = <any>error)
    }else
      this.errorMessage = 'Form is invalid'
  }

  getMessageResponse(resp: LoginResponse){
    if(resp.success){
      this.router.navigate(['']);
    }
    else
      this.errorMessage = resp.message
  }
}
