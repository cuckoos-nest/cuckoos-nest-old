import { PhotoDetailComponent } from './../../photos/photo-detail/photo-detail.component';
import { CommentsComponent } from './../../comments/comments.component';
import { LikeListComponent } from './../../like-list/like-list.component';
import { Observable } from 'rxjs/Observable';
import { UserUploadService } from './../../../services/user-upload.service';
import { UsersService } from './../../../services/users.service';
import { UserModel } from './../../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController, ViewController } from 'ionic-angular';


import { UserUploadModel } from '../../../models/user-upload.model';
// import { UserModel } from '../../../models/user.model';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { FullscreenImageComponent } from '../../fullscreen-image/fullscreen-image.component';

import { timeSince } from './../../../shared/date';

import { WallService } from '../../../services/wall.service';
import { PhotoModel } from '../../../models/photo.model';
import { PhotosService } from '../../../services/photos.service';
import { AuthService } from '../../../services/auth.service';
import { Transfer, TransferObject } from '@ionic-native/transfer';

@Component({
    selector: 'wall-card',
    templateUrl: 'wall-card.html'
})
export class WallCardComponent implements OnInit {
    @Input("data")
    public userUpload: UserUploadModel;
    private photo: PhotoModel
    private user: UserModel;
    private _isLiked: Boolean;
    private _likes: Observable<string[]>;
    private _isLikeLoading: Boolean;
    private _commentsCount: Observable<number>;
    private _likesCount: number;
    private _isOwner: Boolean;
    private fileTransfer: TransferObject = this.transfer.create();

    constructor(public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private nav: NavController, private modalCtrl: ModalController, private photoService: PhotosService, private usersService: UsersService, private userUploadService: UserUploadService, private authService: AuthService, private transfer: Transfer) {
    }

    ngOnInit(): void {
        this._isLikeLoading = true;
        this.photoService.getPhoto(this.userUpload.photo).subscribe(photo => this.photo = photo);
        this.usersService.getUser(this.userUpload.user).subscribe(user => this.user = user);
        this._likes = this.userUploadService.getLikes(this.userUpload.$key);
        this._likes.subscribe(likes => {
            this._isLiked = (likes.indexOf(this.authService.currentUser.$key) != -1);
            this._isLikeLoading = false;
            this._likesCount = likes.length;
        });

        this._isOwner = (this.authService.currentUser.$key == this.userUpload.user);

        this._commentsCount = this.userUploadService.getCommentCount(this.userUpload.$key);
    }


    private goToUser() {
        this.nav.push(UserProfileComponent, {
            user: this.user
        });
    }

    private goToImage() {
        let fullScreenImageModal = this.modalCtrl.create(FullscreenImageComponent, {
            userUpload: this.userUpload
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
            this.userUploadService.like(this.userUpload.$key);
        }
        else {
            this.userUploadService.unlike(this.userUpload.$key);
        }
    }

    private get timeSinceUpload() {
        return timeSince(new Date(this.userUpload.createdAt));
    }

    private viewComments() {
        let commentsModal = this.modalCtrl.create(CommentsComponent, {
            userUpload: this.userUpload
        });
        commentsModal.present();
    }

    private showLikers() {

        if (this._likesCount == 0)
            return;

        let likeModal = this.modalCtrl.create(LikeListComponent, {
            userUpload: this.userUpload
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
                        this.userUploadService.removeUserUpload(this.userUpload.$key);
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
                        this.userUploadService.hideUserUpload(this.userUpload.$key);
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

        actionSheet.addButton( {  text: 'Report', handler: () => {
            
        }});

        actionSheet.present();
    }
}