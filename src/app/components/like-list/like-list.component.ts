import { UserModel } from './../../models/user.model';
import { NavParams, Content, ViewController } from 'ionic-angular';
import { UploadModel } from './../../models/upload.model';
import { UploadLikeModel } from './../../models/upload-likes.model';
import { CommentModel } from './../../models/comment.model';
import { Observable } from 'rxjs/Observable';
import { LikeService } from './../../services/like.service';
import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'like-list',
    templateUrl: 'like-list.html',
})
export class LikeListComponent implements OnInit {
    private _likes: Observable<UserModel[]>;
    private _userUpload: UploadModel;
   
    private _isLoaded: Boolean;

    @ViewChild('content') _content: Content;

    constructor(public viewCtrl: ViewController, private likeService: LikeService, private userService: UserService, private authService: AuthService, private navParams: NavParams) {
    }

    ngOnInit(): void {
         if (this.navParams.get('upload')) {
            this._userUpload = this.navParams.get('upload');
         }
      
        this._likes = this.likeService.getAllByUpload(this._userUpload.$key);
    
        this._likes.subscribe(() => {
            this._isLoaded = true;
           // setTimeout(() => this.scrollToBottom(500), 500);
        });

    }

    private scrollToBottom(speed = 0) {
        console.log("bottom", this._content.getContentDimensions());
        this._content.scrollTo(0, this._content.getContentDimensions().scrollHeight, speed);
    }

    private dismiss() {
        this.viewCtrl.dismiss();
    }

    
}
