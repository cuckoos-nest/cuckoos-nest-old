import { PhotoDetailComponent } from './../photos/photo-detail/photo-detail.component';
import { CategoryService } from './../../services/category.service';
import { CategoryModel } from './../../models/category.model';
import { PhotoModel } from './../../models/photo.model';
import { FullscreenImageComponent } from './../fullscreen-image/fullscreen-image.component';
import { UserProfileComponent } from './../user-profile/user-profile.component';
import { NavController, ModalController } from 'ionic-angular';
import { UserModel } from './../../models/user.model';
import { uploadService } from './../../services/upload.service';
import { UploadModel } from './../../models/upload.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { UserService } from '../../services/user.service';
import { PhotoService } from '../../services/photo.service';

@Component({
    selector: 'search',
    templateUrl: 'search.html'
})
export class SearchComponent implements OnInit {
    private _searchType: string;
    private _isLoaded: Boolean = true;
    private _filteredUserUploads: Array<UploadModel>;
    private _filteredMembers: Array<UserModel>;
    private _filteredPhotos: Array<PhotoModel>
    private _searchQuery: string = '';
    private _currentSubscription: Subscription;
    private _categories: Observable<CategoryModel[]>;
    private _selectedCategory: CategoryModel;
    private recentMemberSearches: Observable<UserModel[]>;

    set searchQuery(value: string) {
        this._searchQuery = value;
        this.performSearch(value);
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    constructor(private nav: NavController, private categoryService: CategoryService, private modalCtrl: ModalController, private userUploadsService: uploadService, private photoService: PhotoService, private userService: UserService) {
    }    

    ngOnInit(): void {
        this._categories = this.categoryService.getAll();
        this.recentMemberSearches =  this.userService.getRecentSearches();
        this._searchType = 'photos';
        this.onSegmentChange();
    }

    private performSearch(query: string) {
        switch (this._searchType) {
            case 'uploads': 
                if (query.length < 3) {
                    this.unsubscribe();
                    this._filteredUserUploads = null;
                    return;
                }

                this._isLoaded = false;
                this._currentSubscription = this.userUploadsService.search(query)
                        .subscribe(userUploads => {
                            this._filteredUserUploads = userUploads;
                            this._isLoaded = true;
                        });
            break;

            case 'members': 
                if (query.length == 0) {
                    this.unsubscribe();
                    this._filteredMembers = null;
                    return;
                }

                this._isLoaded = false;
                this._currentSubscription = this.userService.search(query)
                        .subscribe(users => {
                            this._filteredMembers = users;
                            this._isLoaded = true;
                        });
            break;

            case 'photos': 
                this._isLoaded = false;
                this._currentSubscription = this.photoService.search(query, this._selectedCategory ? this._selectedCategory.$key : null)
                        .subscribe(photos => {
                            this._filteredPhotos = photos;
                            this._isLoaded = true;
                        });
            break;
        }
    }

    private onSegmentChange() {
        this._searchQuery = '';
        this.performSearch(this._searchQuery);
    }
    
    private unsubscribe() {
        if (this._currentSubscription)
        {
            this._currentSubscription.unsubscribe();
            this._currentSubscription = null;
        }
    }

    private goToUser(user: UserModel) {
        this.userService.addRecentSearch(user.$key);
        this.nav.push(UserProfileComponent, {
            user: user
        });
    }

    private goToPhoto(photo: PhotoModel) {
        this.nav.push(PhotoDetailComponent, {
            photo: photo
        });
    }

    private goToUpload(upload: UploadModel) {
        let fullScreenImageModal = this.modalCtrl.create(FullscreenImageComponent, { 
            upload: upload
        });
        fullScreenImageModal.present();
    }

    private getPhotoTitle(photo: PhotoModel) {
        return photo.title;
    }

    private getPhotoImage(photo: PhotoModel) {
        return photo.image;
    }

    private selectCategory(category: CategoryModel) {
        if (this._selectedCategory && this._selectedCategory.$key == category.$key) {
            this._selectedCategory = null;
        }
        else {
            this._selectedCategory = category;
        }
        
        this.performSearch(this._searchQuery);
    }
}