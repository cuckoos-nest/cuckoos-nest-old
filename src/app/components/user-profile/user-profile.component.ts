import { Observable } from 'rxjs/Observable';
import { UserUploadService } from './../../services/user-upload.service';
import { UserModel } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { FullscreenImageComponent } from './../fullscreen-image/fullscreen-image.component';
import { UserUploadModel } from './../../models/user-upload.model';
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController, ModalController } from 'ionic-angular';
import { UsersService } from './../../services/users.service';

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

    constructor(private navController: NavController, private modalCtrl: ModalController, 
                private navParams: NavParams, private authService: AuthService, 
                private usersService: UsersService, private userUploadsService: UserUploadService, 
                private loadingCtrl: LoadingController) { }    
                
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
            this.usersService.follow(this._user.$key);
        }
        else {
            this.usersService.unfollow(this._user.$key);
        }
    }
}