import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms'
import  { LoginResponse } from '../model/login_responce.model'
import { AuthorizationService } from '../services/authorization.service'

@Component({

  selector: 'login',
  templateUrl: 'login.component.html',
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
      this.authServise.loginUser(name, password)
          .subscribe(resp => this.parseResponse(resp),
            error => this.errorMessage = <any>error)
    }
  }

  parseResponse(resp: LoginResponse){
    if(resp.success){
      this.router.navigate(['']);
    }
    else
      this.errorMessage = resp.message
  }
}
