import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserUploadModel } from '../../../models/user-upload.model';
import { UserModel } from '../../../models/user.model';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

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
}