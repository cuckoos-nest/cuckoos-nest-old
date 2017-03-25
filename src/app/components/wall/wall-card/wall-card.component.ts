import { UserModel } from './../../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserUploadModel } from '../../../models/user-upload.model';
// import { UserModel } from '../../../models/user.model';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { FullscreenImageComponent } from '../../fullscreen-image/fullscreen-image.component';

import { WallService } from '../../../services/wall.service';
import { PhotoModel } from '../../../models/photo.model';
import { PhotosService } from '../../../services/photos.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'wall-card',
    templateUrl: 'wall-card.html'
})
export class WallCardComponent implements OnInit {
    @Input("data")
    public userUpload: UserUploadModel;
    private photo: PhotoModel
    private user: UserModel;
    private _isLikeLoading: Boolean;

    constructor(private nav: NavController, private photoService: PhotosService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.photoService.getPhoto(this.userUpload.$key).subscribe(photo => this.photo = photo);
        this.user = this.authService.currentUser;
    }

    private goToUser() {
        this.nav.push(UserProfileComponent, {
            user: this.user
        });
    }

    private goToImage() {
        this.nav.push(FullscreenImageComponent, {
            userUpload: this.userUpload
        });
    }

    private like() {
        // this._isLikeLoading = true;
        // if (this.userUpload.isLiked == false) {
        //     this.wallService.like(this.userUpload.id).subscribe(() => {
        //         this.userUpload.isLiked = true
        //         this._isLikeLoading = false;
        //     });
        // }
        // else {
        //     this.wallService.unlike(this.userUpload.id).subscribe(() => {
        //         this.userUpload.isLiked = false
        //         this._isLikeLoading = false;
        //     });
        // }
    }
}