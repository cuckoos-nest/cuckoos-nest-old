import { Component, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { UserUploadService } from './../../services/user-upload.service';
import { NavController } from "ionic-angular";
import { AlertController } from 'ionic-angular';
import { AuthService } from './../../services/auth.service';
import { CommentsComponent } from './../comments/comments.component';


import { UserUploadModel } from '../../models/user-upload.model';
import { UserModel } from '../../models/user.model';
// import { UserModel } from '../../models/user.model';

@Component({
    selector: 'fullcsreen-image',
    templateUrl: 'fullscreen-image.html'
})
export class FullscreenImageComponent {

    private _userUpload: UserUploadModel;
    private _userKey: string;
    private _isOwner: Boolean;
    private _isLikeLoading: Boolean;
    private _isLiked: Boolean;


    constructor(public alertCtrl: AlertController, private navCtrl: NavController, private navParams: NavParams, private userUploadService: UserUploadService, private authService: AuthService) {
        this._userUpload = navParams.get('userUpload');
        this._userKey = this.authService.currentUser.$key;
        this._isLiked = false;
        this._isOwner = (this._userKey == this._userUpload.user);

        console.log('user key=' + this._userKey);
        console.log('userUpload key=' + this._userUpload.user);
        console.log('_is owner=' + this._isOwner);
    }

    private removePhoto() {
        this.showConfirm();
    }

    private showConfirm()  {
   
        let confirm = this.alertCtrl.create({
            title: 'Delete photo?',
            message: 'Are you sure that you want to remove this photo?',
            buttons: [
            {
                text: 'Disagree',
                handler: () => {  }
            },
            {
                text: 'Agree',
                handler: () => {
                    this.userUploadService.removePhoto(this._userUpload.user, this._userUpload.$key);
                    this.navCtrl.pop();
                }
            }]
        });
        
        confirm.present();
    }

    private like() {
        this._isLikeLoading = true;
        if (this._isLiked == false) {
            console.log("like");
            this.userUploadService.like(this._userUpload.$key);
        }
        else {
            console.log("unlike");
            this.userUploadService.unlike(this._userUpload.$key);
        }

        this._isLiked = !this._isLiked;
    }

    private comment() {
          this.navCtrl.push(CommentsComponent, {
            userUpload: this._userUpload
        });
    }
    
}