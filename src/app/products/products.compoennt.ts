import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service'
import { Product } from '../model/product.model'
import { ProductService } from '../services/product.service'
import { Observable } from 'rxjs/Observable'

@Component({

  selector: 'products',
  templateUrl: 'products.component.html',
  providers: [ProductService]
})

export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  errorMessage: any;

  constructor(private productServ: ProductService) {
  }

  ngOnInit() {
    this.productServ.getProducts().subscribe((res) => {
      this.products = res
      console.log(this.products)
    })

  }

  onSelectProduct(prod: Product){
    this.selectedProduct = null
    this.selectedProduct = prod;
  }
}
