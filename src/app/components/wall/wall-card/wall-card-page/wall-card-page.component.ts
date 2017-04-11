import { Component } from '@angular/core';
import { UserUploadModel } from '../../../../models/user-upload.model';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'wall-card-page',
    templateUrl: 'wall-card-page.html',
})
export class WallCardPageComponent {
    private userUpload: UserUploadModel;

    constructor(private navParams: NavParams) {
        this.userUpload = this.navParams.get("userUpload");
    }
}
