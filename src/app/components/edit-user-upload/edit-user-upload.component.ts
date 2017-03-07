import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';  

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

    constructor(private navController: NavController, private navParams: NavParams, private wallService: WallService, private alertCtrl: AlertController) {
        this._userUpload = navParams.get('userUpload');
    }    
    
    private share() {
        if (!this._userUpload.description) {
            let alert = this.alertCtrl.create({
                title: 'Description missing',
                subTitle: 'Please write a description',
                buttons: ['OK']
            });
            alert.present();
            return;
        }

        this.wallService.share(this._userUpload).subscribe(() => this.navController.popToRoot());
    }
}