import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserUploadModel } from '../../models/user-upload.model';
import { WallService } from '../../services/wall.service';

@Component({
    selector: 'edit-user-upload',
    templateUrl: 'edit-user-upload.html'
})
export class EditUserUploadComponent {

    private _userUpload: UserUploadModel;
    private photoX: number;
    private photoY: number;

    constructor(private navController: NavController, private navParams: NavParams, private wallService: WallService) {
        this._userUpload = navParams.get('userUpload');
    }    
    
    private share() {
        if (!this._userUpload.description) {
            alert("Please write a description");
            return;
        }

        this.wallService.share(this._userUpload).subscribe(() => this.navController.popToRoot());
    }
}