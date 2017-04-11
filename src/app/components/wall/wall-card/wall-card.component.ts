import { LikeService } from './../../../services/like.service';
import { CommentService } from './../../../services/comment.service';
import { PhotoDetailComponent } from './../../photos/photo-detail/photo-detail.component';
import { CommentsComponent } from './../../comments/comments.component';
import { LikeListComponent } from './../../like-list/like-list.component';
import { Observable } from 'rxjs/Observable';
import { uploadService } from './../../../services/upload.service';
import { UserService } from './../../../services/user.service';
import { UserModel } from './../../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController, ViewController } from 'ionic-angular';


import { UploadModel } from '../../../models/upload.model';
// import { UserModel } from '../../../models/user.model';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { FullscreenImageComponent } from '../../fullscreen-image/fullscreen-image.component';

import { timeSince } from './../../../shared/date';

import { WallService } from '../../../services/wall.service';
import { PhotoModel } from '../../../models/photo.model';
import { PhotoService } from '../../../services/photo.service';
import { AuthService } from '../../../services/auth.service';
//import { Transfer, TransferObject } from '@ionic-native/transfer';

@Component({
    selector: 'wall-card',
    templateUrl: 'wall-card.html'
})
export class WallCardComponent implements OnInit {
    @Input("data")
    public upload: UploadModel;
    private photo: PhotoModel
    private user: UserModel;
    private _isLiked: Boolean;
    private _likes: Observable<string[]>;
    private _isLikeLoading: Boolean;
    private _commentsCount: Observable<number>;
    private _likesCount: number;
    private _isOwner: Boolean;
    //private fileTransfer: TransferObject = this.transfer.create();

    constructor(public navParams: NavParams, public alertCtrl: AlertController, private likeService: LikeService, private commentService: CommentService, public actionSheetCtrl: ActionSheetController, private nav: NavController, private modalCtrl: ModalController, private photoService: PhotoService, private userService: UserService, private uploadService: uploadService, private authService: AuthService){
        if (this.navParams.get('upload')) {
            this.upload = this.navParams.get('upload');
        }
    }

    ngOnInit(): void {
        this._isLikeLoading = true;
        this.photoService.get(this.upload.photo).subscribe(photo => this.photo = photo);
        this.userService.get(this.upload.user).subscribe(user => this.user = user);
        this._likes = this.likeService.getUids(this.upload.$key);
        this._likes.subscribe(likes => {
            this._isLiked = (likes.indexOf(this.authService.currentUser.$key) != -1);
            this._isLikeLoading = false;
            this._likesCount = likes.length;
        });

        this._isOwner = (this.authService.currentUser.$key == this.upload.user);

        this._commentsCount = this.commentService.count(this.upload.$key);
    }


    private goToUser() {
        this.nav.push(UserProfileComponent, {
            user: this.user
        });
    }

    private goToImage() {
        let fullScreenImageModal = this.modalCtrl.create(FullscreenImageComponent, {
            upload: this.upload
        });
        fullScreenImageModal.present();
    }

    private goToPhoto() {
        this.nav.push(PhotoDetailComponent, {
            photo: this.photo
        });
    }

    private like() {
        this._isLikeLoading = true;

        if (this._isLiked == false) {
            this.likeService.like(this.upload.$key);
        }
        else {
            this.likeService.unlike(this.upload.$key);
        }
    }

    private get timeSinceUpload() {
        return timeSince(new Date(this.upload.createdAt));
    }

    private viewComments() {
        let commentsModal = this.modalCtrl.create(CommentsComponent, {
            upload: this.upload
        });
        commentsModal.present();
    }

    private showLikers() {

        if (this._likesCount == 0)
            return;

        let likeModal = this.modalCtrl.create(LikeListComponent, {
            upload: this.upload
        });

        likeModal.present();
    }

    private removePhoto() {



        let confirm = this.alertCtrl.create({
            title: 'Delete photo?',
            message: 'Are you sure that you want to remove this photo?',
            buttons: [
                {
                    text: 'Disagree',
                    handler: () => { }
                },
                {
                    text: 'Agree',
                    handler: () => {
                        console.log("delete");
                        this.uploadService.remove(this.upload.$key);
                    }
                }]
        });

        confirm.present();
    }

    private options() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Options',

            buttons: [
                
                {
                    text: 'View',

                    handler: () => {
                        this.goToImage();
                    }
                },
                {
                    text: 'Hide',

                    handler: () => {
                        console.log("hide");
                        this.uploadService.hide(this.upload.$key);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {

                    }

                }
            ]
        });

        if (this._isOwner) {
            let button = {
                text: 'Delete',
                role: 'destructive',
                handler: () => {
                    this.removePhoto();
                    // TODO: remove it from the profile as well
                }
            };
            actionSheet.addButton(button);

        }

        actionSheet.addButton( { text: 'Report', handler: () => {

        }});

        actionSheet.present();
    }
}