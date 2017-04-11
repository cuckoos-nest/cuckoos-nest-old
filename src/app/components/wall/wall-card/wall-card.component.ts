import { LikeService } from './../../../services/like.service';
import { CommentService } from './../../../services/comment.service';
import { PhotoDetailComponent } from './../../photos/photo-detail/photo-detail.component';
import { CommentsComponent } from './../../comments/comments.component';
import { Observable } from 'rxjs/Observable';
import { uploadService } from './../../../services/upload.service';
import { UserService } from './../../../services/user.service';
import { UserModel } from './../../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController, ViewController } from 'ionic-angular';


import { UploadModel } from '../../../models/upload.model';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { FullscreenImageComponent } from '../../fullscreen-image/fullscreen-image.component';

import { timeSince } from './../../../shared/date';

import { WallService } from '../../../services/wall.service';
import { PhotoModel } from '../../../models/photo.model';
import { PhotoService } from '../../../services/photo.service';
import { AuthService } from '../../../services/auth.service';
import { UsersListComponent } from '../../users-list/users-list.component';

@Component({
    selector: 'wall-card',
    templateUrl: 'wall-card.html'
})
export class WallCardComponent implements OnInit {
    @Input("data") public upload: UploadModel;
    private photo: PhotoModel
    private user: UserModel;
    private isLiked: Boolean;
    private likes: Observable<string[]>;
    private isLikeLoading: Boolean;
    private commentsCount: Observable<number>;
    private likesCount: number;
    private isOwner: Boolean;

    constructor(private navParams: NavParams, private alertCtrl: AlertController, 
                private likeService: LikeService, private commentService: CommentService, 
                private actionSheetCtrl: ActionSheetController, private nav: NavController, 
                private modalCtrl: ModalController, private photoService: PhotoService, 
                private userService: UserService, private uploadService: uploadService, 
                private authService: AuthService) {
        if (this.navParams.get('upload')) {
            this.upload = this.navParams.get('upload');
        }
    }

    ngOnInit(): void {
        this.isLikeLoading = true;
        this.photoService.get(this.upload.photo).subscribe(photo => this.photo = photo);
        this.userService.get(this.upload.user).subscribe(user => this.user = user);
        this.likes = this.likeService.getUids(this.upload.$key);
        this.likes.subscribe(likes => {
            this.isLiked = (likes.indexOf(this.authService.currentUser.$key) != -1);
            this.isLikeLoading = false;
            this.likesCount = likes.length;
        });

        this.isOwner = (this.authService.currentUser.$key == this.upload.user);

        this.commentsCount = this.commentService.count(this.upload.$key);
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
        this.isLikeLoading = true;

        if (this.isLiked == false) {
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
        if (this.likesCount == 0)
            return;

        let usersModal = this.modalCtrl.create(UsersListComponent, {
            title: 'Likes',
            users: this.likeService.getAllByUpload(this.upload.$key)
        });

        usersModal.present();
    }

    private removeUpload() {
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

        if (this.isOwner) {
            let button = {
                text: 'Delete',
                role: 'destructive',
                handler: () => {
                    this.removeUpload();
                }
            };
            actionSheet.addButton(button);

        }

        actionSheet.addButton( { text: 'Report', handler: () => {

        }});

        actionSheet.present();
    }
}