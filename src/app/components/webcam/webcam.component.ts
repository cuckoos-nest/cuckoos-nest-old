import { AuthService } from './../../services/auth.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UploadModel } from '../../models/upload.model';
import { PhotoModel } from '../../models/photo.model';

import { EditUserUploadComponent } from '../edit-user-upload/edit-user-upload.component';

import { UserService } from '../../services/user.service';


@Component({
    selector: 'webcam',
    templateUrl: 'webcam.html'
})
export class WebcamComponent implements AfterViewInit {

    public photo: PhotoModel;

    @ViewChild("video")
    private video: any;

    @ViewChild("canvas")
    private canvas: any;

    private isStreaming: Boolean;

    constructor(private navController: NavController, private navParams: NavParams, 
                private authService: AuthService) {
        this.photo = navParams.get('photo');
    }

    private takePhoto() {
        let video: any = this.video.nativeElement;
        let canvas: any = this.canvas.nativeElement;

        var context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        var base64Image = canvas.toDataURL('image/jpeg');

        let upload: UploadModel = {
            photo: this.photo.$key,
            user: this.authService.currentUser.$key,
            image: base64Image,
            likesCount: 0,
            commentsCount: 0,
        };

        this.navController.push(EditUserUploadComponent, {
            upload: upload
        });
    }

    public ngAfterViewInit() {
        let video: any = this.video.nativeElement;

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
            if (!this.isStreaming) {
                this.isStreaming = true;
            }
        }, false);
    }
}