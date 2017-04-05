import { UserModel } from './../../models/user.model';
import { NavParams, Content, ViewController } from 'ionic-angular';
import { UserUploadModel } from './../../models/user-upload.model';
import { UploadLikeModel } from './../../models/upload-likes.model';
import { CommentModel } from './../../models/comment.model';
import { Observable } from 'rxjs/Observable';
import { UploadLikesService } from './../../services/upload-likes.services';
import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'like-list',
    templateUrl: 'like-list.html',
})
export class LikeListComponent implements OnInit {
    private _likes: Observable<UserModel[]>;
    private _userUpload: UserUploadModel;
   
    private _isLoaded: Boolean;

    @ViewChild('content') _content: Content;

    constructor(public viewCtrl: ViewController, private uploadLikeService: UploadLikesService, private usersService: UsersService, private authService: AuthService, private navParams: NavParams) {
    }

    ngOnInit(): void {
         if (this.navParams.get('userUpload')) {
            this._userUpload = this.navParams.get('userUpload');
         }
      
        this._likes = this.uploadLikeService.getLikes(this._userUpload.$key);
    
        this._likes.subscribe(() => {
            this._isLoaded = true;
            // setTimeout(() => this.scrollToBottom(500), 500);
        });

    }

    //   private scrollToBottom(speed = 0) {
    //     console.log("bottom", this._content.getContentDimensions());
    //     this._content.scrollTo(0, this._content.getContentDimensions().scrollHeight, speed);
    // }

     private dismiss() {
        this.viewCtrl.dismiss();
    }

    
}
