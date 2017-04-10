import { Observable } from 'rxjs/Observable';
import { UserUploadService } from './../../services/user-upload.service';
import { UserModel } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { FullscreenImageComponent } from './../fullscreen-image/fullscreen-image.component';
import { UserUploadModel } from './../../models/user-upload.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, NavController, LoadingController, ModalController, Content, ToastController } from 'ionic-angular';
import { UsersService } from './../../services/users.service';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.html'
})
export class UserProfileComponent implements OnInit {
    private _user: UserModel;
    private _isMyProfile: Boolean;
    private _userUploads: Observable<UserUploadModel[]>;
    private _isFollowedByMe: Boolean;
    private _isLoaded: Boolean;
    private followers: Observable<UserModel[]>;
    private following: Observable<UserModel[]>;

    @ViewChild('content') content: Content;
    @ViewChild('uploads') uploads: ElementRef;

    constructor(private navController: NavController, private modalCtrl: ModalController,
        private navParams: NavParams, private authService: AuthService,
        private usersService: UsersService, private userUploadsService: UserUploadService,
        private loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

    ngOnInit(): void {
        if (this.navParams.get('user')) {
            this._user = this.navParams.get('user');
        }
        else {
            this._user = this.authService.currentUser;
        }

        this._userUploads = this.userUploadsService.getUserUploadsByUser(this._user.$key);
        this._userUploads.subscribe(() => this._isLoaded = true);

        this._isMyProfile = (this._user.$key == this.authService.currentUser.$key);

        if (!this._isMyProfile) {
            this.usersService.isFollowingUser(this._user.$key).subscribe(isFollowing => this._isFollowedByMe = isFollowing);
        }

        this.followers = this.usersService.getFollowers(this._user.$key);
        this.following = this.usersService.getFollowing(this._user.$key);
    }

    private getUploadImage(userUpload: UserUploadModel): string {
        return userUpload.image;
    }

    private uploadClicked(userUpload: UserUploadModel) {
        let fullScreenImageModal = this.modalCtrl.create(FullscreenImageComponent, {
            userUpload: userUpload
        });
        fullScreenImageModal.present();
    }

    private follow() {
        if (!this._isFollowedByMe) {
            this.usersService.follow(this._user.$key)
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
            this.usersService.unfollow(this._user.$key);
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