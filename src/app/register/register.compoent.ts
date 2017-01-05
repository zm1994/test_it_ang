import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms'
import  { LoginResponse } from '../model/login_responce.model'
import { AuthorizationService } from '../services/authorization.service'

@Component({

  selector: 'register',
  templateUrl: 'register.component.html',
  providers: [AuthorizationService]
})

export class RegisterComponent implements OnInit{
  formRegister: FormGroup;
  errorMessage: any;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private authServise: AuthorizationService) { }

  ngOnInit(){
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

  register() {
    if(this.formRegister.valid){
      let name = this.formRegister.value.username
      let password = this.formRegister.value.password
      let password_confirm = this.formRegister.value.password_confirm
      if(password == password_confirm){
        this.authServise.createUser(name, password)
          .subscribe(resp => this.getMessageResponse(resp),
                      error => this.errorMessage = <any>error)
      }
    }

  }

  getMessageResponse(res: LoginResponse){
    if(!!res.message)
      this.errorMessage = res.message;
    else
      this.router.navigate([''])
  }
}
