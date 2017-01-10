import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms'
import  { LoginResponse } from '../../model/login_response.model'
import { AuthorizationService } from '../../services/authorization.service'
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({

  selector: 'signup',
  templateUrl: 'signup.component.html',
  providers: [AuthorizationService],
  styleUrls: ['../../../assets/css/authorization.component.css']
})

export class SignupComponent implements OnInit{
  formRegister: FormGroup;
  errorMessage: any;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private authServise: AuthorizationService) { }

  ngOnInit(){
    if(this.authServise.userIsLoggedIn())
      this.router.navigate([''])
    //build form and validate inputs
    this.formRegister =this.builder.group({
      username:['', [
        Validators.minLength(4),
        Validators.maxLength(24),
        Validators.required
      ]],
      password: ['', [
        Validators.minLength(4),
        Validators.maxLength(24),
        Validators.required
      ]],
      password_confirm: ['', [
        Validators.minLength(4),
        Validators.maxLength(24),
        Validators.required
      ]]
    })
  }

  signup() {
    if(this.formRegister.valid){
      let name = this.formRegister.value.username
      let password = this.formRegister.value.password
      let password_confirm = this.formRegister.value.password_confirm
      if(password == password_confirm){
        //send request to api for sign up
        this.authServise.createUser(name, password)
          .subscribe(resp => this.getMessageResponse(resp),
                      error => this.errorMessage = <any>error)
      }else
        this.errorMessage = 'Form is invalid'
    }
}

  getMessageResponse(res: LoginResponse){
    if(!!res.message)
      this.errorMessage = res.message;
    else
      this.router.navigate([''])
  }
}
