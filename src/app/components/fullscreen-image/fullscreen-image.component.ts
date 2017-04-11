import { LikeService } from './../../services/like.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { uploadService } from './../../services/upload.service';
import { NavController } from "ionic-angular";
import { AlertController, ViewController } from 'ionic-angular';
import { AuthService } from './../../services/auth.service';
import { CommentsComponent } from './../comments/comments.component';


import { UploadModel } from '../../models/upload.model';
import { UserModel } from '../../models/user.model';

@Component({
    selector: 'fullcsreen-image',
    templateUrl: 'fullscreen-image.html'
})
export class FullscreenImageComponent implements OnInit {
    private _userUpload: UploadModel;
    private _userKey: string;
    private _isOwner: Boolean;
    private _isLikeLoading: Boolean;
    private _isLiked: Boolean;


    constructor(public alertCtrl: AlertController, public viewCtrl: ViewController, private likeService: LikeService, private navCtrl: NavController, private navParams: NavParams, private uploadService: uploadService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this._userUpload = this.navParams.get('upload');
        this._userKey = this.authService.currentUser.$key;
        this._isOwner = (this._userKey == this._userUpload.user);

        this.likeService.getUids(this._userUpload.$key).subscribe(likes => {
            this._isLiked = (likes.indexOf(this.authService.currentUser.$key) != -1);
        });
    }

    private removePhoto() {
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
                    this.uploadService.remove(this._userUpload.$key);
                    this.navCtrl.pop();
                }
            }]
        });
        
        confirm.present();
    }

    private like() {
        this._isLikeLoading = true;
        if (this._isLiked == false) {
            this.likeService.like(this._userUpload.$key);
        }
        else {
            this.likeService.unlike(this._userUpload.$key);
        }
    }

    private comment() {
          this.navCtrl.push(CommentsComponent, {
            upload: this._userUpload
        });
    }

    private dismiss() {
        this.viewCtrl.dismiss();
    }
    
}