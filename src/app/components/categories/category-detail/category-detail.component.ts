import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { Category, Photo } from '../../../models/photo.models';

import { PhotosService } from '../../../services/photos.service';

@Component({
    selector: '<category-detail></category-detail>',
    templateUrl: 'category-detail.html'
})
export class CategoryDetailComponent {

    photos : Photo[];
    category : Category;

    constructor(private navParams: NavParams, private photosService: PhotosService) {
        this.category = navParams.get('category');
         this.photosService.getPhotosByCategory(this.category.id)
            .subscribe(photos => this.photos = photos); 
    }    

    private takePhoto(item : string) : void {

        Camera.getPicture().then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
        });
    }

    private getPhotoTitle(photo) {
        return photo.title;
    }

    private getPhotoImage(photo) {
        return "assets/testingImages/banana.png";
    }
}