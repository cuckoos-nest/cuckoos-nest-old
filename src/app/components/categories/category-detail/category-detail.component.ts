import { Observable } from 'rxjs/Observable';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';

import { PhotoModel } from '../../../models/photo.model';
import { CategoryModel } from '../../../models/category.model';
import { UploadModel } from '../../../models/upload.model';

import { PhotoService } from '../../../services/photo.service';
import { UserService } from '../../../services/user.service';

import { PhotoDetailComponent } from '../../photos/photo-detail/photo-detail.component';
import { EditUserUploadComponent } from '../../edit-user-upload/edit-user-upload.component';
import { WebcamComponent } from '../../webcam/webcam.component';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'category-detail',
    templateUrl: 'category-detail.html'
})
export class CategoryDetailComponent implements OnInit {
    private photos : Observable<PhotoModel[]>
    private category : CategoryModel;
    private _isFollowedByMe: Observable<Boolean>;
    private _isLoaded: Boolean;

    constructor(private authService: AuthService, private userService: UserService, private navController: NavController, private navParams: NavParams, private photoService: PhotoService, private categoryService: CategoryService, private loadingCtrl: LoadingController) {
    }    

    ngOnInit(): void {
        this.category = this.navParams.get('category');
        this.photos = this.photoService.getAllByCategory(this.category.$key);
        this.photos.subscribe(() => this._isLoaded = true);
        this._isFollowedByMe = this.userService.isFollowingCategory(this.category.$key);
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
        this.categoryService.follow(this.category.$key);
    }

    private unfollow() {
        this.categoryService.unfollow(this.category.$key);
    }
}