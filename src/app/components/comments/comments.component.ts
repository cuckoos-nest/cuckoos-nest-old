import { UserModel } from './../../models/user.model';
import { NavParams } from 'ionic-angular';
import { UserUploadModel } from './../../models/user-upload.model';
import { CommentModel } from './../../models/comment.model';
import { Observable } from 'rxjs/Observable';
import { UserUploadService } from './../../services/user-upload.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'comments',
    templateUrl: 'comments.html',
})
export class CommentsComponent implements OnInit {
    private _comments: Observable<CommentModel[]>;
    private _userUpload: UserUploadModel;
    private _commentText: string;
    private _isLoaded: Boolean;

    constructor(private userUploadService: UserUploadService, private usersService: UsersService, private authService: AuthService, private navParams: NavParams) {
    }

    ngOnInit(): void {
        if (this.navParams.get('userUpload')) {
            this._userUpload = this.navParams.get('userUpload');
        }
        
        this._isLoaded = !this._userUpload.commentsCount;

        this._comments = this.userUploadService.getComments(this._userUpload.$key);
        this._comments.subscribe(() => this._isLoaded = true);
    }

    private send() {
        let comment = new CommentModel();
        comment.user = this.authService.currentUser.$key;
        comment.text = this._commentText;
        comment.createdAt = new Date();

        this.userUploadService.createComment(comment, this._userUpload.$key);

        this._commentText = "";
    }
}
