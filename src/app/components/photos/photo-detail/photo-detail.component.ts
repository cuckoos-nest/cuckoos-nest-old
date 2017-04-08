import { UsersService } from './../../../services/users.service';
import { PhotosService } from './../../../services/photos.service';
import { FullscreenImageComponent } from './../../fullscreen-image/fullscreen-image.component';
import { EditUserUploadComponent } from './../../edit-user-upload/edit-user-upload.component';
import { AuthService } from './../../../services/auth.service';
import { WebcamComponent } from './../../webcam/webcam.component';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams, LoadingController, Platform, NavController, ModalController } from 'ionic-angular';
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
    private followPhoto: Boolean;
    private followersPhotoCount: Observable<number>;

    constructor(private platform: Platform, private modalCtrl: ModalController,
        private authService: AuthService, private navController: NavController,
        private navParams: NavParams, private loader: LoadingController,
        private userUploadService: UserUploadService, private photoService: PhotosService,
        private userService: UsersService) { }

    ngOnInit(): void {
        this.photo = this.navParams.get('photo');
        this.userUploads = this.userUploadService.getUserUploadsByPhoto(this.photo.$key);
        this.userUploads.subscribe(() => this._isLoaded = true);
        this.userService.isFollowingPhoto(this.photo.$key).subscribe(isFollow => this.followPhoto = isFollow);
        this.followersPhotoCount = this.photoService.getFollowersPhotoCount(this.photo.$key);
    }

    getPhotoImage(userUpload: UserUploadModel) {
        return userUpload.image;
    }

    follow() {
        if (this.followPhoto)
            this.photoService.unfollow(this.photo.$key).then(() => this.followPhoto = false);
        else
            this.photoService.follow(this.photo.$key).then(() => this.followPhoto = true);
    }

    private takePhoto(item: string): void {
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

    private uploadClicked(userUpload: UserUploadModel) {
        let fullScreenImageModal = this.modalCtrl.create(FullscreenImageComponent, {
            userUpload: userUpload
        });
        fullScreenImageModal.present();
    }
}