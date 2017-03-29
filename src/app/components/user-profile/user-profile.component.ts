import { Observable } from 'rxjs/Observable';
import { UserUploadService } from './../../services/user-upload.service';
import { UserModel } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { FullscreenImageComponent } from './../fullscreen-image/fullscreen-image.component';
import { UserUploadModel } from './../../models/user-upload.model';
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController } from 'ionic-angular';
import { UsersService } from './../../services/users.service';

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.html'
})
export class UserProfileComponent implements OnInit {
    private _user: UserModel;
    private _isMyProfile: Boolean;
    private _userUploads: Observable<UserUploadModel[]>;
    private _isFollowedByMe: Observable<Boolean>;

    constructor(private navController: NavController, private navParams: NavParams, private authService: AuthService, private usersService: UsersService, private userUploadsService: UserUploadService, private loadingCtrl: LoadingController) {
    }    

    ngOnInit(): void {
        if (this.navParams.get('user')) {
            this._user = this.navParams.get('user');
        }
        else {
            this._user = this.authService.currentUser;
        }

        this._userUploads = this.userUploadsService.getUserUploadsByUser(this._user.$key);

        this._isMyProfile = (this._user.$key == this.authService.currentUser.$key);

        if (!this._isMyProfile) {
            this._isFollowedByMe = this.usersService.isFollowingUser(this._user.$key);
        }
    }

    private getUploadImage(userUpload: UserUploadModel): string {
        return userUpload.image;
    }

    private uploadClicked(userUpload : UserUploadModel) {
        this.navController.push(FullscreenImageComponent, {
            userUpload: userUpload
        });
    }

    private follow() {
        this.usersService.follow(this._user.$key);
    }

    private unfollow() {
        this.usersService.unfollow(this._user.$key);
    }
}