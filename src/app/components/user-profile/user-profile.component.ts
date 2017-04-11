import { Observable } from 'rxjs/Observable';
import { uploadService } from './../../services/upload.service';
import { UserModel } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { FullscreenImageComponent } from './../fullscreen-image/fullscreen-image.component';
import { UploadModel } from './../../models/upload.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, NavController, LoadingController, ModalController, Content, ToastController } from 'ionic-angular';
import { UserService } from './../../services/user.service';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.html'
})
export class UserProfileComponent implements OnInit {
    private _user: UserModel;
    private _isMyProfile: Boolean;
    private _userUploads: Observable<UploadModel[]>;
    private _isFollowedByMe: Boolean;
    private _isLoaded: Boolean;
    private followers: Observable<UserModel[]>;
    private following: Observable<UserModel[]>;

    @ViewChild('content') content: Content;
    @ViewChild('uploads') uploads: ElementRef;

    constructor(private navController: NavController, private modalCtrl: ModalController,
        private navParams: NavParams, private authService: AuthService,
        private userService: UserService, private userUploadsService: uploadService,
        private loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

    ngOnInit(): void {
        if (this.navParams.get('user')) {
            this._user = this.navParams.get('user');
        }
        else {
            this._user = this.authService.currentUser;
        }

        this._userUploads = this.userUploadsService.getAllByUser(this._user.$key);
        this._userUploads.subscribe(() => this._isLoaded = true);

        this._isMyProfile = (this._user.$key == this.authService.currentUser.$key);

        if (!this._isMyProfile) {
            this.userService.isFollowingUser(this._user.$key).subscribe(isFollowing => this._isFollowedByMe = isFollowing);
        }

        this.followers = this.userService.getFollowers(this._user.$key);
        this.following = this.userService.getFollowing(this._user.$key);
    }

    private getUploadImage(upload: UploadModel): string {
        return upload.image;
    }

    private uploadClicked(upload: UploadModel) {
        let fullScreenImageModal = this.modalCtrl.create(FullscreenImageComponent, {
            upload: upload
        });
        fullScreenImageModal.present();
    }

    private follow() {
        if (!this._isFollowedByMe) {
            this.userService.follow(this._user.$key)
                .then(() => {
                    let toast = this.toastCtrl.create({
                        message: `You're now following ${this._user.displayName}!`,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                });
        }
        else {
            this.userService.unfollow(this._user.$key);
        }
    }

    private showPhotos() {

    }

    private showFollowing() {
        let usersModal = this.modalCtrl.create(UsersListComponent, {
            title: 'Following',
            users: this.following
        });

        usersModal.present();
    }

    private showFollowers() {
        let usersModal = this.modalCtrl.create(UsersListComponent, {
            title: 'Followers',
            users: this.followers,
        });

        usersModal.present();
    }

    private showUploads() {
        let yOffset = this.uploads.nativeElement.offsetTop;
        console.log("div", this.uploads);
        this.content.scrollTo(0, yOffset, 1000)
    }
}