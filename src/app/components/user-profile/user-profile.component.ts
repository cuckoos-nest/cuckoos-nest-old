import { FullscreenImageComponent } from './../fullscreen-image/fullscreen-image.component';
import { UserUploadModel } from './../../models/user-upload.model';
import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController } from 'ionic-angular';

import { UserModel } from '../../models/user.model';
import { UsersService } from './../../services/users.service';
import { UserUploadService } from '../../services/user-upload.service';

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.html'
})
export class UserProfileComponent {

    private _user: UserModel;
    private _isMyProfile: Boolean;
    private _userUploads: UserUploadModel[];
    private _isFollowedByMe: Boolean;

    constructor(private navController: NavController, private navParams: NavParams, private usersService: UsersService, private userUploadService: UserUploadService, private loadingCtrl: LoadingController) {
        let loader = this.loadingCtrl.create({
            content: `Loading Profile`
        });
        loader.present();
        
        this._user = navParams.get('user');

        if (navParams.get('user')) {
            this._user = navParams.get('user');
        }
        else {
            this._user = this.usersService.loggedInUser;
        }

        this._isFollowedByMe = this.usersService.loggedInUser.usersImFollowing.indexOf(this._user.id) != -1;

        userUploadService.getUploadsByUser(this._user.id)
            .subscribe((userUploads: UserUploadModel[]) => {
                this._userUploads = userUploads;
                loader.dismiss();
            });
        
        this._isMyProfile = (this._user.id == this.usersService.loggedInUser.id);
    }    

    private getUploadImage(userUpload: UserUploadModel): string {
        return 'data:image/jpeg;base64,' + userUpload.image;
    }

    private uploadClicked(userUpload : UserUploadModel) {
        this.navController.push(FullscreenImageComponent, {
            userUpload: userUpload
        });
    }

    private follow() {
        this.usersService.follow(this._user.id).subscribe(() => {
            this._isFollowedByMe = true;
        });;
    }

    private unfollow() {
        this.usersService.unfollow(this._user.id).subscribe(() => {
            this._isFollowedByMe = false;
        });;
    }
}