import { FullscreenImageComponent } from './../fullscreen-image/fullscreen-image.component';
import { UserProfileComponent } from './../user-profile/user-profile.component';
import { NavController } from 'ionic-angular';
import { UserModel } from './../../models/user.model';
import { UserUploadService } from './../../services/user-upload.service';
import { UserUploadModel } from './../../models/user-upload.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'search',
    templateUrl: 'search.html'
})
export class SearchComponent implements OnInit {
    private _searchType: string;
    private _isLoaded: Boolean = true;
    private _filteredUserUploads: Array<UserUploadModel>;
    private _filteredMembers: Array<UserModel>;
    private _searchQuery: string = '';
    private _currentSubscription: Subscription;

    set searchQuery(value: string) {
        this._searchQuery = value;
        this.performSearch(value);
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    constructor(private nav: NavController, private userUploadsService: UserUploadService, private usersService: UsersService) {
    }    

    ngOnInit(): void {
        this._searchType = 'uploads';
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
                this._currentSubscription = this.userUploadsService.searchUserUploads(query)
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
                this._currentSubscription = this.usersService.searchUsers(query)
                        .subscribe(users => {
                            this._filteredMembers = users;
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
        this.nav.push(UserProfileComponent, {
            user: user
        });
    }

    private goToUpload(userUpload: UserUploadModel) {
        this.nav.push(FullscreenImageComponent, {
            userUpload: userUpload
        });
    }
}