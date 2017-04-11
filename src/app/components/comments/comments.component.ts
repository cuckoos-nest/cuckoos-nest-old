import { CommentService } from './../../services/comment.service';
import { UserModel } from './../../models/user.model';
import { NavParams, Content, ViewController, AlertController } from 'ionic-angular';
import { UploadModel } from './../../models/upload.model';
import { CommentModel } from './../../models/comment.model';
import { Observable } from 'rxjs/Observable';
import { uploadService } from './../../services/upload.service';
import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'comments',
    templateUrl: 'comments.html',
})
export class CommentsComponent implements OnInit {
    private _comments: Observable<CommentModel[]>;
    private _userUpload: UploadModel;
    private _commentText: string;
    private _isLoaded: Boolean;

    @ViewChild('content') _content: Content;

    constructor(public alertCtrl: AlertController, public viewCtrl: ViewController, private commentService: CommentService, private uploadService: uploadService, private userService: UserService, private authService: AuthService, private navParams: NavParams) {
    }

    ngOnInit(): void {
        if (this.navParams.get('upload')) {
            this._userUpload = this.navParams.get('upload');
        }
        
        this._isLoaded = !this._userUpload.commentsCount;

        this._comments = this.commentService.getAll(this._userUpload.$key);
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

        this.commentService.create(comment, this._userUpload.$key).then(() => this.scrollToBottom(500));

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
                        this.commentService.remove(this._userUpload.$key, comment.$key);
                    }
                }]
        });

        confirm.present();

        
    }
}
