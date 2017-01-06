import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, URLSearchParams, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Product } from '../model/product.model'
import {AuthorizationService} from "./authorization.service";

@Injectable()
export class ProductService {
  api_root_path = 'http://smktesting.herokuapp.com/';

  constructor(private http: Http,
              private authServ: AuthorizationService){}

  getProducts(): Observable<Product[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    headers.append('Authorization', this.authServ.getUserToken());
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get(this.api_root_path + '/api/products/', options) // ...using post request
      .map((res:Response) => {
        return <Product[]> res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors i
  }

  getComments(id_entry: string): Observable<Comment[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    headers.append('Authorization', this.authServ.getUserToken());
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get(this.api_root_path + '/api/reviews/' + id_entry, options) // ...using post request
      .map((res:Response) => {
        return <Comment[]> res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors i
  }
}
