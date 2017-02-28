import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserUploadModel } from '../../../models/user-upload.model';
import { UserModel } from '../../../models/user.model';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { FullscreenImageComponent } from '../../fullscreen-image/fullscreen-image.component';

@Component({
    selector: 'wall-card',
    templateUrl: 'wall-card.html'
})
export class WallCardComponent {

    @Input("data")
    public userUpload: UserUploadModel;

    constructor(private nav: NavController) {
    }

    private goToUser(user: UserModel) {
        this.nav.push(UserProfileComponent, {
            user: user
        });
    }

    private goToImage(userUpload: UserUploadModel) {
        this.nav.push(FullscreenImageComponent, {
            userUpload: userUpload
        });
    }
}