import { FullscreenImageComponent } from './../../fullscreen-image/fullscreen-image.component';
import { EditUserUploadComponent } from './../../edit-user-upload/edit-user-upload.component';
import { AuthService } from './../../../services/auth.service';
import { WebcamComponent } from './../../webcam/webcam.component';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams, LoadingController, Platform, NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { PhotoModel } from '../../../models/photo.model';
import { UserUploadModel } from '../../../models/user-upload.model'; 
import { UserUploadService } from '../../../services/user-upload.service';

@Component({
    selector: 'photo-detail',
    templateUrl: 'photo-detail.html'
})
export class PhotoDetailComponent implements OnInit {
    private photo: PhotoModel;
    private userUploads: Observable<UserUploadModel[]>;
    private _isLoaded: Boolean;

    constructor(private platform: Platform, private authService: AuthService, private navController: NavController, private navParams: NavParams, private loader: LoadingController, private userUploadService: UserUploadService) {
    }

    ngOnInit(): void {
        this.photo = this.navParams.get('photo');
        this.userUploads = this.userUploadService.getUserUploadsByPhoto(this.photo.$key);
        this.userUploads.subscribe(() => this._isLoaded = true);
    }

    getPhotoImage(userUpload: UserUploadModel) {
        return userUpload.image;
    }

    private takePhoto(item : string) : void {
        if (this.platform.is("cordova")) {
            this.takePhotoFromNative();
        }
        else {
            this.takePhotoFromBroswer();
        }
    }

    private takePhotoFromBroswer() {
        this.navController.push(WebcamComponent, {
            photo: this.photo
        });
    }

    private takePhotoFromNative() {
        Camera.getPicture({
            destinationType: 0
        }).then((imageData) => {
            let base64Image = imageData;
            
            let userUpload: UserUploadModel = new UserUploadModel();
            userUpload.photo = this.photo.$key;
            userUpload.user = this.authService.currentUser.$key;
            userUpload.image = base64Image;
            userUpload.likesCount = 0;
            userUpload.commentsCount = 0;

            this.navController.push(EditUserUploadComponent, {
                userUpload: userUpload
            });
        }, (err) => {
            // Handle error
        });
    }

    private uploadClicked(userUpload : UserUploadModel) {
        this.navController.push(FullscreenImageComponent, {
            userUpload: userUpload
        });
    }
}