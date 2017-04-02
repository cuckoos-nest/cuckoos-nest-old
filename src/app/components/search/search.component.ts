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
    private _isLoaded: Boolean;
    private _userUploads: Array<UserUploadModel>;
    private _filteredUserUploads: Array<UserUploadModel>;
    private _members: Array<UserModel>;
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

    constructor(private userUploadsService: UserUploadService, private usersService: UsersService) {
    }    

    ngOnInit(): void {
        this._searchType = 'uploads';
        this.onSegmentChange();
    }

    private performSearch(query: string) {
        switch (this._searchType) {
            case 'uploads': 
                if (query && query.trim() != '') {
                    this._filteredUserUploads = 
                        this._userUploads.filter(item => (item.description.toLowerCase().indexOf(query.toLowerCase()) > -1));
                }
                else {
                    this._filteredUserUploads = this._userUploads;
                }
            break;

            case 'members': 
                if (query && query.trim() != '') {
                    this._filteredMembers = 
                        this._members.filter(item => (item.displayName.toLowerCase().indexOf(query.toLowerCase()) > -1));
                }
                else {
                    this._filteredMembers = this._members;
                }
            break;
        }
    }

    private onSegmentChange() {
        if (this._currentSubscription)
        {
            this._currentSubscription.unsubscribe();
            this._currentSubscription = null;
        }

        this._isLoaded = false;

        switch (this._searchType) {
            case 'uploads': 
                this._currentSubscription = this.userUploadsService.getUserUploads()
                        .subscribe(userUploads => {
                            this._userUploads = userUploads;
                            this.performSearch(this._searchQuery);
                            this._isLoaded = true;                    
                        });
            break;
            
            case 'members':
                this._currentSubscription = this.usersService.getUsers()
                        .subscribe(users => {
                            this._members = users;
                            this.performSearch(this._searchQuery);
                            this._isLoaded = true;                    
                        });
            break;
        }
    }
}