import { UserModel } from './../../models/user.model';
import { NavParams, Content, ViewController, AlertController } from 'ionic-angular';
import { UserUploadModel } from './../../models/user-upload.model';
import { CommentModel } from './../../models/comment.model';
import { Observable } from 'rxjs/Observable';
import { UserUploadService } from './../../services/user-upload.service';
import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
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

    @ViewChild('content') _content: Content;

    constructor(public alertCtrl: AlertController, public viewCtrl: ViewController, private userUploadService: UserUploadService, private usersService: UsersService, private authService: AuthService, private navParams: NavParams) {
    }

    ngOnInit(): void {
        if (this.navParams.get('userUpload')) {
            this._userUpload = this.navParams.get('userUpload');
        }
        
        this._isLoaded = !this._userUpload.commentsCount;

        this._comments = this.userUploadService.getComments(this._userUpload.$key);
        this._comments.subscribe(() => {
            this._isLoaded = true;
            setTimeout(() => this.scrollToBottom(500), 500);
        });
    }

    private send() {
        let comment = new CommentModel();
        comment.user = this.authService.currentUser.$key;
        comment.text = this._commentText;
        comment.createdAt = new Date();

        this.userUploadService.createComment(comment, this._userUpload.$key).then(() => this.scrollToBottom(500));

        this._commentText = "";
    }

    private scrollToBottom(speed = 0) {
        console.log("bottom", this._content.getContentDimensions());
        this._content.scrollTo(0, this._content.getContentDimensions().scrollHeight, speed);
    }

    private dismiss() {
        this.viewCtrl.dismiss();
    }

    public onHold(comment: CommentModel) {
        

        // check if I am the owner of the photo
        if(this.authService.currentUser.$key == this._userUpload.user ||
            comment.user == this.authService.currentUser.$key)
            this.removeComment(comment);

       
       
    }

    private removeComment(comment: CommentModel)
    {
        let confirm = this.alertCtrl.create({
            title: 'Delete comment?',
            message: 'Are you sure that you want to remove this comment?',
            buttons: [
                {
                    text: 'Disagree',
                    handler: () => { }
                },
                {
                    text: 'Agree',
                    handler: () => {
                        this.userUploadService.removeComment(this._userUpload.$key, comment.$key);
                    }
                }]
        });

        confirm.present();

        
    }
}
