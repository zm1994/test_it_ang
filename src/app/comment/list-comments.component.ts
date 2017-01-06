import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { AuthorizationService } from '../services/authorization.service'
import { Product } from '../model/product.model'
import { ProductService } from '../services/product.service'
import { Comment } from '../model/comment.model';
import { Observable } from 'rxjs/Observable'
import {Subscription} from "rxjs";

@Component({

  selector: 'list-comments',
  templateUrl: 'list-comments.component.html',
  providers: [ProductService]
})

export class CommentsComponent implements OnChanges {
  @Input() idProduct: string;
  comments: Comment[];
  errorMessage: any;

  constructor(private productServ: ProductService) {
  }

  ngOnChanges() {
      if(this.idProduct) {
        this.productServ.getComments(this.idProduct).subscribe((res) => {
          this.comments = res
          console.log(this.comments)
        })
      }
  }
}
