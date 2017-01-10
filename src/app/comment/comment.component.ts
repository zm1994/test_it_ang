import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { AuthorizationService } from '../services/authorization.service'
import { Product } from '../model/product.model'
import { ProductService } from '../services/product.service'
import { Comment } from '../model/comment.model';
import { Observable } from 'rxjs/Observable'
import {Subscription} from "rxjs";
import { User } from '../model/user.model'

@Component({

  selector: 'comment',
  templateUrl: 'comment.component.html',
  providers: [ProductService],
  styleUrls: ['../../assets/css/comment.component.css'],
})

export class CommentComponent implements OnInit {
    @Input() comment: Comment;
    arrayRate: Array<number>;

    constructor(){}

    ngOnInit(){
        console.log(this.comment)
        //create array(count eq comment rate) for display count img stars
        this.arrayRate = new Array(this.comment.rate).fill(1);
    }
}