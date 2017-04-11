import { Observable } from 'rxjs/Observable';
import { uploadService } from './../../services/upload.service';
import { UserModel } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { FullscreenImageComponent } from './../fullscreen-image/fullscreen-image.component';
import { UploadModel } from './../../models/upload.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, NavController, LoadingController, ModalController, Content, ToastController } from 'ionic-angular';
import { UserService } from './../../services/user.service';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.html'
})
export class UserProfileComponent implements OnInit {
    private user: UserModel;
    private isMyProfile: Boolean;
    private uploads: Observable<UploadModel[]>;
    private isFollowedByMe: Boolean;
    private isLoaded: Boolean;
    private followers: Observable<UserModel[]>;
    private following: Observable<UserModel[]>;

    @ViewChild('content') content: Content;
    @ViewChild('uploads') uploadsRef: ElementRef;

    constructor(private navController: NavController, private modalCtrl: ModalController,
        private navParams: NavParams, private authService: AuthService,
        private userService: UserService, private userUploadsService: uploadService,
        private loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

    ngOnInit(): void {
        if (this.navParams.get('user')) {
            this.user = this.navParams.get('user');
        }
        else {
            this.user = this.authService.currentUser;
        }

        this.uploads = this.userUploadsService.getAllByUser(this.user.$key);
        this.uploads.subscribe(() => this.isLoaded = true);

        this.isMyProfile = (this.user.$key == this.authService.currentUser.$key);

        if (!this.isMyProfile) {
            this.userService.isFollowingUser(this.user.$key).subscribe(isFollowing => this.isFollowedByMe = isFollowing);
        }

        this.followers = this.userService.getFollowers(this.user.$key);
        this.following = this.userService.getFollowing(this.user.$key);
    }

    private getUploadImage(upload: UploadModel): string {
        return upload.image;
    }

    private uploadClicked(upload: UploadModel) {
        let fullScreenImageModal = this.modalCtrl.create(FullscreenImageComponent, {
            upload: upload
        });
        fullScreenImageModal.present();
    }

    private follow() {
        if (!this.isFollowedByMe) {
            this.userService.follow(this.user.$key)
                .then(() => {
                    let toast = this.toastCtrl.create({
                        message: `You're now following ${this.user.displayName}!`,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                });
        }
        else {
            this.userService.unfollow(this.user.$key);
        }
    }

    private showFollowing() {
        let usersModal = this.modalCtrl.create(UsersListComponent, {
            title: 'Following',
            users: this.following
        });

        usersModal.present();
    }

    private showFollowers() {
        let usersModal = this.modalCtrl.create(UsersListComponent, {
            title: 'Followers',
            users: this.followers,
        });

        usersModal.present();
    }

    private showUploads() {
        let yOffset = this.uploadsRef.nativeElement.offsetTop;
        this.content.scrollTo(0, yOffset, 1000)
    }
}