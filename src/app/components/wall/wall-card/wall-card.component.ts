import { PhotoDetailComponent } from './../../photos/photo-detail/photo-detail.component';
import { CommentsComponent } from './../../comments/comments.component';
import { Observable } from 'rxjs/Observable';
import { UserUploadService } from './../../../services/user-upload.service';
import { UsersService } from './../../../services/users.service';
import { UserModel } from './../../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserUploadModel } from '../../../models/user-upload.model';
// import { UserModel } from '../../../models/user.model';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { FullscreenImageComponent } from '../../fullscreen-image/fullscreen-image.component';

import { WallService } from '../../../services/wall.service';
import { PhotoModel } from '../../../models/photo.model';
import { PhotosService } from '../../../services/photos.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'wall-card',
    templateUrl: 'wall-card.html'
})
export class WallCardComponent implements OnInit {
    @Input("data")
    public userUpload: UserUploadModel;
    private photo: PhotoModel
    private user: UserModel;
    private _isLiked: Boolean;
    private _likes: Observable<string[]>;
    private _isLikeLoading: Boolean;

    constructor(private nav: NavController, private photoService: PhotosService, private usersService: UsersService, private userUploadService: UserUploadService, private authService: AuthService){
    }

    ngOnInit(): void {
        this._isLikeLoading = true;
        this.photoService.getPhoto(this.userUpload.photo).subscribe(photo => this.photo = photo);
        this.usersService.getUser(this.userUpload.user).subscribe(user => this.user = user);
        this._likes = this.userUploadService.getLikes(this.userUpload.$key);
        this._likes.subscribe(likes => {
            this._isLiked = (likes.indexOf(this.authService.currentUser.$key) != -1);
            this.userUpload.likesCount = likes.length;
            this._isLikeLoading = false;
        });
    }


    private goToUser() {
        this.nav.push(UserProfileComponent, {
            user: this.user
        });
    }

    private goToImage() {
        this.nav.push(FullscreenImageComponent, {
            userUpload: this.userUpload
        });
    }

    private goToPhoto() {
        this.nav.push(PhotoDetailComponent, {
            photo: this.photo
        });
    }

    private like() {
        this._isLikeLoading = true;
        
        if (this._isLiked == false) {
            this.userUploadService.like(this.userUpload.$key);
        }
        else {
            this.userUploadService.unlike(this.userUpload.$key);
        }
    }

    private viewComments() {
        this.nav.push(CommentsComponent, {
            userUpload: this.userUpload
        });
    }
}