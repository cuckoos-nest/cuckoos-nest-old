import { Component } from '@angular/core';
import { UploadModel } from '../../../../models/upload.model';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'wall-card-page',
    templateUrl: 'wall-card-page.html',
})
export class WallCardPageComponent {
    private upload: UploadModel;

    constructor(private navParams: NavParams) {
        this.upload = this.navParams.get("upload");
    }
}
