import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams, LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { PhotoModel } from '../../../models/photo.model';
import { UserUploadModel } from '../../../models/user-upload.model'; 
import { UserUploadService } from '../../../services/user-upload.service';

@Component({
    selector: 'photo-detail',
    templateUrl: 'photo-detail.html'
})
export class PhotoDetailComponent implements OnInit {
    mainPhoto: PhotoModel;
    usersUploads: UserUploadModel[];
    camera: Camera;

    constructor(private navParams: NavParams, private http: Http, private userUploadService : UserUploadService, private loader : LoadingController) {
    }

    ngOnInit(): void {
        this.mainPhoto = this.navParams.get('photo');
        let load = this.loader.create({
            content : 'Loading photos...'
        });
        load.present();
        this.userUploadService.getMostPopularPhotosByPhotoId(this.mainPhoto.id, 1, 1)
            .subscribe(useruploads => {
                this.usersUploads = useruploads;
                load.dismiss();
            });
    }

    getPhotoTitle(userUpload: UserUploadModel) {
        return 'image';
    }

    getPhotoImage(userUpload: UserUploadModel) {
        return userUpload.image;
    }

    openCamera() {
        Camera.getPicture()
        .then(imageData => {
            console.log('took picture.');
            let base64Image = 'data:image/jpeg;base64,' + imageData;
        })
        .catch(err => {
            console.log('no picture. error occured.', err);
        });
    }
}