import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { PhotoModel } from '../../../models/photo.model';
import { PhotosService } from '../../../services/photos.service';

@Component({
    selector: 'photo-detail',
    templateUrl: 'photo-detail.html'
})
export class PhotoDetailComponent {
    photo: PhotoModel;
    camera: Camera;

    constructor(private navParams: NavParams, private http: Http, private photosService: PhotosService) {
        this.photo = this.navParams.get('photo');
        console.log(this.photo);
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