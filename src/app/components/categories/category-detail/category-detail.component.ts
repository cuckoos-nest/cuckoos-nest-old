import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';

import { PhotoModel } from '../../../models/photo.model';
import { CategoryModel } from '../../../models/category.model';
import { UserUploadModel } from '../../../models/user-upload.model';

import { PhotosService } from '../../../services/photos.service';
import { UsersService } from '../../../services/users.service';

import { PhotoDetailComponent } from '../../photos/photo-detail/photo-detail.component';
import { EditUserUploadComponent } from '../../edit-user-upload/edit-user-upload.component';
import { WebcamComponent } from '../../webcam/webcam.component';

@Component({
    selector: 'category-detail',
    templateUrl: 'category-detail.html'
})
export class CategoryDetailComponent {

    photos : PhotoModel[];
    category : CategoryModel;

    constructor(private navController: NavController, private navParams: NavParams, private photosService: PhotosService, private usersService: UsersService, private loadingCtrl: LoadingController) {
        this.category = navParams.get('category');
        
        let loader = this.loadingCtrl.create({
            content: `Loading ${this.category.name}`
        });
        loader.present();

         this.photosService.getPhotosByCategory(this.category.id)
            .subscribe(photos => { 
                this.photos = photos;
                loader.dismiss();
            }); 
    }    

    private onSuccess(test: any) {
        console.log("yay", test);
    }

    private takePhoto(item : string) : void {
        this.takePhotoFromBroswer();
    }

    private takePhotoFromBroswer() {
        this.navController.push(WebcamComponent, {
            photo: this.photos[0]
        });
    }

    private takePhotoFromNative() {
        Camera.getPicture({
            destinationType: 0
        }).then((imageData) => {
            let base64Image = imageData;
            
            let userUpload: UserUploadModel = new UserUploadModel();
            userUpload.photo = this.photos[0];
            userUpload.user = this.usersService.loggedInUser;
            userUpload.image = base64Image;

            this.navController.push(EditUserUploadComponent, {
                userUpload: userUpload
            });
        }, (err) => {
            // Handle error
        });
    }

    photoClicked(photo : PhotoModel) {
        this.navController.push(PhotoDetailComponent, {
            photo: photo
        });
    }

    private getPhotoTitle(photo: PhotoModel) {
        return photo.title;
    }

    private getPhotoImage(photo: PhotoModel) {
        return 'data:image/jpeg;base64,' +  photo.image;
    }
}