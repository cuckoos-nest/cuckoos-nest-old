import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserUploadModel } from '../../../models/user-upload.model';
import { UserModel } from '../../../models/user.model';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { FullscreenImageComponent } from '../../fullscreen-image/fullscreen-image.component';

import { WallService } from '../../../services/wall.service';

@Component({
    selector: 'wall-card',
    templateUrl: 'wall-card.html'
})
export class WallCardComponent {

    @Input("data")
    public userUpload: UserUploadModel;

    private _isLikeLoading: Boolean;

    constructor(private nav: NavController, private wallService: WallService) {
    }

    private goToUser(user: UserModel) {
        this.nav.push(UserProfileComponent, {
            user: user
        });
    }

    private goToImage() {
        this.nav.push(FullscreenImageComponent, {
            userUpload: this.userUpload
        });
    }

    private like() {
        this._isLikeLoading = true;
        if (this.userUpload.isLiked == false) {
            this.wallService.like(this.userUpload.id).subscribe(() => {
                this.userUpload.isLiked = true
                this._isLikeLoading = false;
            });
        }
        else {
            this.wallService.unlike(this.userUpload.id).subscribe(() => {
                this.userUpload.isLiked = false
                this._isLikeLoading = false;
            });
        }
    }
}