import {Component, OnInit, Input} from '@angular/core';
import { AuthorizationService } from '../services/authorization.service'
import { FormGroup, FormBuilder,Validators } from '@angular/forms'
import { Comment } from '../model/comment.model';
import { Observable } from 'rxjs/Observable'
import {Subscription} from "rxjs";
import { User } from '../model/user.model'
import { CommentResponse } from '../model/comment_response.model'
import { CommentComponent } from './comment.component'
import { ProductService } from '../services/product.service'

@Component({

  selector: 'comment-sender',
  templateUrl: 'comment_sender.component.html',
  styleUrls: ['../../assets/css/comment_sender.component.css'],
  providers: [ProductService]
})

export class CommentSenderComponent implements OnInit {
    @Input() idProduct: string;
    userLogged: boolean;
    commentForSend: Comment;
    formComment: FormGroup;
    errorMessage: string;
    
    constructor(
        private authServ: AuthorizationService,
        private builder: FormBuilder,
        private productServ: ProductService){
            this.commentForSend = new Comment();
        }

    ngOnInit(){
        //check enabling this component
        this.userLogged = this.authServ.userIsLoggedIn();
        this.errorMessage = '';
        //build form send comment and validates
        this.formComment =this.builder.group({
            comment:['', [
                Validators.minLength(4),
                Validators.maxLength(5000),
                Validators.required]
                ],
            rating: ['', [
                Validators.required]
                ]
        })
    }

    sendComment(){
        if(this.formComment.valid){
            this.commentForSend.created_at = new Date();
            //send request to api with comment
            this.productServ.sendComment(this.commentForSend, this.idProduct)
                .subscribe(resp => this.getMessageResponse(resp),
                           error => this.errorMessage = <any>error)
        }else
            this.errorMessage = "Form is invalid"
    }

    getMessageResponse(resp: CommentResponse){
        //check api response
        if(resp.review_id){
            this.formComment.reset();
        }
    }
}
