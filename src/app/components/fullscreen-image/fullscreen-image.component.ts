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
    selector: 'fullscreen-image',
    templateUrl: 'fullscreen-image.html'
})
export class FullscreenImageComponent implements OnInit {
    private upload: UploadModel;
    private uid: string;
    private isOwner: Boolean;
    private isLikeLoading: Boolean;
    private isLiked: Boolean;


    constructor(private alertCtrl: AlertController, private viewCtrl: ViewController, 
                private likeService: LikeService, private navCtrl: NavController, 
                private navParams: NavParams, private uploadService: uploadService, 
                private authService: AuthService) { }

    ngOnInit(): void {
        this.upload = this.navParams.get('upload');
        this.uid = this.authService.currentUser.$key;
        this.isOwner = (this.uid == this.upload.user);

        this.likeService.getUids(this.upload.$key).subscribe(likes => {
            this.isLiked = (likes.indexOf(this.authService.currentUser.$key) != -1);
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
                    this.uploadService.remove(this.upload.$key);
                    this.navCtrl.pop();
                }
            }]
        });
        
        confirm.present();
    }

    private like() {
        this.isLikeLoading = true;
        if (this.isLiked == false) {
            this.likeService.like(this.upload.$key);
        }
        else {
            this.likeService.unlike(this.upload.$key);
        }
    }

    private comment() {
          this.navCtrl.push(CommentsComponent, {
            upload: this.upload
        });
    }

    private dismiss() {
        this.viewCtrl.dismiss();
    }
}