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
    private comments: Observable<CommentModel[]>;
    private userUpload: UploadModel;
    private commentText: string;
    private isLoaded: Boolean;

    @ViewChild('content') content: Content;

    constructor(private alertCtrl: AlertController, private viewCtrl: ViewController,
        private commentService: CommentService, private uploadService: uploadService,
        private userService: UserService, private authService: AuthService,
        private navParams: NavParams) { }

    ngOnInit(): void {
        if (this.navParams.get('upload')) {
            this.userUpload = this.navParams.get('upload');
        }

        this.isLoaded = !this.userUpload.commentsCount;

        this.comments = this.commentService.getAll(this.userUpload.$key);
        this.comments.subscribe(() => {
            this.isLoaded = true;
            setTimeout(() => this.scrollToBottom(500), 500);
        });
    }

    private send() {
        let comment: CommentModel = {
            user: this.authService.currentUser.$key,
            text: this.commentText,
            createdAt: new Date(),
        };

        this.commentService.create(comment, this.userUpload.$key).then(() => this.scrollToBottom(500));

        this.commentText = "";
    }

    private scrollToBottom(speed = 0) {
        this.content.scrollTo(0, this.content.getContentDimensions().scrollHeight, speed);
    }

    private dismiss() {
        this.viewCtrl.dismiss();
    }

    public onHold(comment: CommentModel) {
        if (this.authService.currentUser.$key == this.userUpload.user ||
            comment.user == this.authService.currentUser.$key) {
            this.removeComment(comment);
        }
    }

    private removeComment(comment: CommentModel) {
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
                        this.commentService.remove(this.userUpload.$key, comment.$key);
                    }
                }]
        });

        confirm.present();
    }
}
