import { AuthService } from './../../services/auth.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserUploadModel } from '../../models/user-upload.model';
import { PhotoModel } from '../../models/photo.model';

import { EditUserUploadComponent } from '../edit-user-upload/edit-user-upload.component';

import { UsersService } from '../../services/users.service';


@Component({
    selector: 'webcam',
    templateUrl: 'webcam.html'
})
export class WebcamComponent implements AfterViewInit {

    public photo: PhotoModel;

    @ViewChild("video")
    private _video: any;

    @ViewChild("canvas")
    private _canvas: any;

    private _isStreaming: Boolean;

    constructor(private navController: NavController, private navParams: NavParams, private authService: AuthService) {
        this.photo = navParams.get('photo');
    }

    private takePhoto() {
        let video: any = this._video.nativeElement;
        let canvas: any = this._canvas.nativeElement;

        var context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        var base64Image = canvas.toDataURL('image/jpeg');

        let userUpload: UserUploadModel = new UserUploadModel();
        userUpload.photo = this.photo.$key;
        userUpload.user = this.authService.currentUser.$key;
        userUpload.image = base64Image;

        this.navController.push(EditUserUploadComponent, {
            userUpload: userUpload
        });
    }

    public ngAfterViewInit() {
        let video: any = this._video.nativeElement;

        var n = <any>navigator;
         n.getUserMedia  = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
         n.getUserMedia({video: true, audio:false}
         ,function(stream: any) {
             video.srcObject = stream;
             video.play();
         } 
         ,function(err: any) {
            console.log("The following error occurred: " + err.name);
         });

        video.addEventListener('canplay', function(ev: any){
            if (!this._isStreaming) {
                this._isStreaming = true;
            }
        }, false);
    }
}