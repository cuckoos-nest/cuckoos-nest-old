import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { UserUploadService } from './../../services/user-upload.service';
import { NavController } from "ionic-angular";
import { AlertController, ViewController } from 'ionic-angular';
import { AuthService } from './../../services/auth.service';
import { CommentsComponent } from './../comments/comments.component';


import { UserUploadModel } from '../../models/user-upload.model';
import { UserModel } from '../../models/user.model';

@Component({
    selector: 'fullcsreen-image',
    templateUrl: 'fullscreen-image.html'
})
export class FullscreenImageComponent implements OnInit {
    private _userUpload: UserUploadModel;
    private _userKey: string;
    private _isOwner: Boolean;
    private _isLikeLoading: Boolean;
    private _isLiked: Boolean;


    constructor(public alertCtrl: AlertController, public viewCtrl: ViewController, private navCtrl: NavController, private navParams: NavParams, private userUploadService: UserUploadService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this._userUpload = this.navParams.get('userUpload');
        this._userKey = this.authService.currentUser.$key;
        this._isOwner = (this._userKey == this._userUpload.user);

        this.userUploadService.getLikes(this._userUpload.$key).subscribe(likes => {
            this._isLiked = (likes.indexOf(this.authService.currentUser.$key) != -1);
        });
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
            this.userUploadService.like(this._userUpload.$key);
        }
        else {
            this.userUploadService.unlike(this._userUpload.$key);
        }
    }

    private comment() {
          this.navCtrl.push(CommentsComponent, {
            userUpload: this._userUpload
        });
    }

    private dismiss() {
        this.viewCtrl.dismiss();
    }
    
}