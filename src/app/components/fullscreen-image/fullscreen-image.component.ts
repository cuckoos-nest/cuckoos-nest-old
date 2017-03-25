import { Component, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { UserUploadModel } from '../../models/user-upload.model';
// import { UserModel } from '../../models/user.model';

@Component({
    selector: 'fullcsreen-image',
    templateUrl: 'fullscreen-image.html'
})
export class FullscreenImageComponent {

    private _userUpload: UserUploadModel;

    constructor(private navParams: NavParams) {
        this._userUpload = navParams.get('userUpload');
    }
}