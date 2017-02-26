import { Component } from '@angular/core';
import { WallComponent } from '../wall/wall.component';
import { SearchComponent } from '../search/search.component';
import { CategoriesComponent } from '../categories/categories.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
    selector: 'main-menu',
    templateUrl: 'main-menu.html'
})
export class MainMenuComponent {

    private _wallTab: any;
    private _searchTab: any;
    private _addTab: any;
    private _profileTab: any;
    private _notificationsTab: any;

    constructor() {
        this._wallTab = WallComponent;
        this._searchTab = SearchComponent;
        this._addTab = CategoriesComponent;
        this._profileTab = UserProfileComponent;
        this._notificationsTab = NotificationsComponent;
    }    
}