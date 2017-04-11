import { UserService } from './../../../services/user.service';
import { PhotoService } from './../../../services/photo.service';
import { FullscreenImageComponent } from './../../fullscreen-image/fullscreen-image.component';
import { EditUserUploadComponent } from './../../edit-user-upload/edit-user-upload.component';
import { AuthService } from './../../../services/auth.service';
import { WebcamComponent } from './../../webcam/webcam.component';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams, LoadingController, Platform, NavController, ModalController, ToastController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { PhotoModel } from '../../../models/photo.model';
import { UploadModel } from '../../../models/upload.model';
import { uploadService } from '../../../services/upload.service';

@Component({
    selector: 'photo-detail',
    templateUrl: 'photo-detail.html'
})
export class PhotoDetailComponent implements OnInit {
    private photo: PhotoModel;
    private userUploads: Observable<UploadModel[]>;
    private isLoaded: Boolean;
    private followPhoto: Boolean;
    private followersPhotoCount: Observable<number>;

    constructor(private platform: Platform, private modalCtrl: ModalController,
        private authService: AuthService, private navController: NavController,
        private navParams: NavParams, private loader: LoadingController,
        private uploadService: uploadService, private photoService: PhotoService,
        private userService: UserService, private toastCtrl: ToastController) { }

    ngOnInit(): void {
        this.photo = this.navParams.get('photo');
        this.userUploads = this.uploadService.getAllByPhoto(this.photo.$key);
        this.userUploads.subscribe(() => this.isLoaded = true);
        this.userService.isFollowingPhoto(this.photo.$key).subscribe(isFollow => this.followPhoto = isFollow);
        this.followersPhotoCount = this.photoService.getFollowersCount(this.photo.$key);
    }

    private getPhotoImage(upload: UploadModel) {
        return upload.image;
    }

    private follow() {
        if (this.followPhoto) {
            this.photoService.unfollow(this.photo.$key).then(() => this.followPhoto = false);
        }
        else {
            this.photoService.follow(this.photo.$key).then(() => {
                this.followPhoto = true;
                let toast = this.toastCtrl.create({
                    message: `You're now following ${this.photo.title}!`,
                    position: 'top',
                    duration: 3000
                });
                toast.present();
            });
        }
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

            let upload: UploadModel = {
                photo: this.photo.$key,
                user: this.authService.currentUser.$key,
                image: 'data:image/jpeg;base64,' + base64Image,
                likesCount: 0,
                commentsCount: 0,
            };

            this.navController.push(EditUserUploadComponent, {
                upload: upload
            });
        });
    }

    private uploadClicked(upload: UploadModel) {
        let fullScreenImageModal = this.modalCtrl.create(FullscreenImageComponent, {
            upload: upload
        });
        fullScreenImageModal.present();
    }
}