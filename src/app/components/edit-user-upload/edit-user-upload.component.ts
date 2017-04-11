import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';  

import { UploadModel } from '../../models/upload.model';
import { WallService } from '../../services/wall.service';
import { uploadService } from '../../services/upload.service';

@Component({
    selector: 'edit-user-upload',
    templateUrl: 'edit-user-upload.html'
})
export class EditUserUploadComponent {

    private upload: UploadModel;
    private photoX: number;
    private photoY: number;

    constructor(private navController: NavController, private uploadService: uploadService, 
                private navParams: NavParams, private alertCtrl: AlertController) {
        this.upload = navParams.get('upload');
    }    
    
    private share() {
        if (!this.upload.description) {
            let alert = this.alertCtrl.create({
                title: 'Description missing',
                subTitle: 'Please write a description',
                buttons: ['OK']
            });
            alert.present();
            return;
        }

        this.uploadService.create(this.upload);
        this.navController.popToRoot();
    }
}