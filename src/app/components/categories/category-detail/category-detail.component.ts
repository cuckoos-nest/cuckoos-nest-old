import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';

import { PhotoModel } from '../../../models/photo.model';
import { CategoryModel } from '../../../models/category.model';
import { UserUploadModel } from '../../../models/user-upload.model';

import { PhotosService } from '../../../services/photos.service';
import { UsersService } from '../../../services/users.service';

import { EditUserUploadComponent } from '../../edit-user-upload/edit-user-upload.component';

@Component({
    selector: 'category-detail',
    templateUrl: 'category-detail.html'
})
export class CategoryDetailComponent {

    photos : PhotoModel[];
    category : CategoryModel;

    constructor(private navController: NavController, private navParams: NavParams, private photosService: PhotosService, private usersService: UsersService) {
        this.category = navParams.get('category');
         this.photosService.getPhotosByCategory(this.category.id)
            .subscribe(photos => this.photos = photos); 
    }    

    private takePhoto(item : string) : void {
        Camera.getPicture({
            destinationType: 0
        }).then((imageData) => {
            let base64Image = imageData;
            
            let userUpload: UserUploadModel = new UserUploadModel();
            userUpload.photo = this.photos[0];
            userUpload.user = this.usersService.loggedInUser;
            userUpload.imageBase64 = base64Image;

            this.navController.push(EditUserUploadComponent, {
                userUpload: userUpload
            });
        }, (err) => {
            // Handle error
        });
    }

    private getPhotoTitle(photo: PhotoModel) {
        return photo.title;
    }

    private getPhotoImage(photo: PhotoModel) {
        return photo.imageUrl;
    }
}