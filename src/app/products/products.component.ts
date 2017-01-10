import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service'
import { Product } from '../model/product.model'
import { ProductService } from '../services/product.service'
import { Observable } from 'rxjs/Observable'

@Component({

  selector: 'products',
  templateUrl: 'products.component.html',
  styleUrls: ['../../assets/css/products.component.css'],
  providers: [ProductService]
})

export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  errorMessage: any;

  constructor(private productServ: ProductService) {
    this.products = [];
  }

  ngOnInit() {
    // for(let i = 0; i < 20; i++){
    //   let pr = new Product();
    //   pr.id =  "${i}";
    //   pr.image = "test image"
    //   pr.text = "Lorem ipsum"
    //   pr.title = `Lorem ipsum title ${i}` 
    //   this.products.push(pr);
    // }
    //send request to api for getting products
    this.productServ.getProducts().subscribe((res) => {
      this.products = res
      console.log(this.products)
    })

  }

  onSelectProduct(prod: Product){
    this.selectedProduct = null
    this.selectedProduct = prod;
  }

  disableSelectedProduct(){
    this.selectedProduct = null;
  }
}
