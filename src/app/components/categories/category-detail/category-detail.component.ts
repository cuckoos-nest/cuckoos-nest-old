import { Observable } from 'rxjs/Observable';
import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';

import { PhotoModel } from '../../../models/photo.model';
import { CategoryModel } from '../../../models/category.model';
import { UserUploadModel } from '../../../models/user-upload.model';

import { PhotosService } from '../../../services/photos.service';
import { UsersService } from '../../../services/users.service';

import { PhotoDetailComponent } from '../../photos/photo-detail/photo-detail.component';
import { EditUserUploadComponent } from '../../edit-user-upload/edit-user-upload.component';
import { WebcamComponent } from '../../webcam/webcam.component';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'category-detail',
    templateUrl: 'category-detail.html'
})
export class CategoryDetailComponent implements OnInit {
    photos : Observable<PhotoModel[]>
    category : CategoryModel;
    _isFollowedByMe: Observable<Boolean>;

    constructor(private authService: AuthService, private usersService: UsersService, private navController: NavController, private navParams: NavParams, private photosService: PhotosService, private categoriesService: CategoriesService, private loadingCtrl: LoadingController) {
    }    

    ngOnInit(): void {
        this.category = this.navParams.get('category');
        this.photos = this.photosService.getPhotosByCategory(this.category.$key);
        this._isFollowedByMe = this.usersService.isFollowingCategory(this.category.$key);
    }

    private photoClicked(photo : PhotoModel) {
        this.navController.push(PhotoDetailComponent, {
            photo: photo
        });
    }

    private getPhotoTitle(photo: PhotoModel) {
        return photo.title;
    }

    private getPhotoImage(photo: PhotoModel) {
        return photo.image;
    }

    private follow() {
        this.categoriesService.follow(this.category.$key);
    }

    private unfollow() {
        this.categoriesService.unfollow(this.category.$key);
    }
}