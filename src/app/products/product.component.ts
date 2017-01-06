import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service'
import { Product } from '../model/product.model'
import { ProductService } from '../services/product.service'
import { Observable } from 'rxjs/Observable'

@Component({

  selector: 'product',
  templateUrl: 'product.component.html',
  providers: [ProductService]
})

export class ProductComponent {
  @Input() currentProduct: Product;

  constructor(private productServ: ProductService) {
  }
}
