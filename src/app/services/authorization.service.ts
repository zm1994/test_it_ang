import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, URLSearchParams, Response } from "@angular/http";
import { LoginResponse } from '../model/login_responce.model'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {CanActivate} from "@angular/router";

@Injectable()
export class AuthorizationService {
  api_root_path = 'http://smktesting.herokuapp.com/'

  constructor(private http: Http){}

  userIsLoggedIn(): boolean{
    return !!this.getUserToken()
  }

  private setUserToken(value: String){
    Cookie.set('token', value)
  }

  private getUserToken(): String{
    return Cookie.get('token')
  }

  createUser(name: String, password: String): Observable<LoginResponse>{
    return this.sendAuthorizationRequest(this.api_root_path + '/api/register/?format=json', name, password)
  }

  loginUser(name: String, password: String): Observable<LoginResponse>{
    return this.sendAuthorizationRequest(this.api_root_path + '/api/login/?format=json', name, password)
  }

  private sendAuthorizationRequest(api_url: string, name: string, password: string): Observable<LoginResponse>{
    let data = {
      "username": name,
      "password": password
    };
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(api_url, data, options) // ...using post request
      .map((res:Response) => {
        let resp = <LoginResponse> res.json()
        this.parseResponse(resp)
        return resp;
      }) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors i
  }

  private parseResponse(resp: LoginResponse) {
    if (resp.success) {
      this.setUserToken(resp.token)
    }
  }
}
