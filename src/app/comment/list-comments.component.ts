import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { AuthorizationService } from '../services/authorization.service'
import { Product } from '../model/product.model'
import { ProductService } from '../services/product.service'
import { Comment } from '../model/comment.model';
import { Observable } from 'rxjs/Observable'
import {Subscription} from "rxjs";
import { User } from '../model/user.model'
import { CommentComponent } from './comment.component'

@Component({

  selector: 'list-comments',
  templateUrl: 'list-comments.component.html',
  styleUrls: ['../../assets/css/list-comments.component.css'],
  providers: [ProductService],
})

export class CommentsComponent implements OnChanges {
  @Input() idProduct: string;
  comments: Comment[];
  errorMessage: any;

  constructor(private productServ: ProductService) {
    this.comments = [];
    // for(let i = 0; i < 20; i++){
    //   let com = new Comment();
    //   com.product =  '1';
    //   com.rate = 5;
    //   com.text = `lorem ipsum ${i}`
    //   com.created_by = new User;
    //   com.created_by.username = "VAsya"
    //   com.created_at = new Date();
    //   com.id_entry
    //   this.comments.push(com);
    // }
}


  ngOnChanges() {
      //send request to api for get comments
      if(this.idProduct) {
        this.productServ.getComments(this.idProduct).subscribe((res) => {
          this.comments = res
          console.log(this.comments)
        })
      }
  }
}
