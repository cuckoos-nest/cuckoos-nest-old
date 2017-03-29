import { Observable } from 'rxjs/Observable';
import { Component, ViewChild } from '@angular/core';
import { WallComponent } from '../wall/wall.component';
import { SearchComponent } from '../search/search.component';
import { CategoriesComponent } from '../categories/categories.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { NotificationsComponent } from '../notifications/notifications.component';

import { UsersService } from '../../services/users.service';
import { NotificationsService } from '../../services/notifications.service';

import { NotificationModel } from '../../models/notification.model';


import { NavController, NavParams } from 'ionic-angular';
import { EditUserUploadComponent } from '../edit-user-upload/edit-user-upload.component';
import { PhotosService } from '../../services/photos.service';
import { PhotoModel } from '../../models/photo.model';
import { CategoryModel } from '../../models/category.model';
import { UserUploadModel } from '../../models/user-upload.model';

@Component({
    selector: 'main-menu',
    templateUrl: 'main-menu.html'
})
export class MainMenuComponent {

    private _wallTab: Component;
    private _searchTab: Component;
    private _addTab: Component;
    private _profileTab: Component;
    private _notificationsTab: Component;

    private _newNotifications: Observable<number>;

    constructor(private notificationsService: NotificationsService) {
        let isEditDebug: Boolean = false;

        this._wallTab = WallComponent;
        this._searchTab = SearchComponent;
        this._addTab = CategoriesComponent;
        this._profileTab = UserProfileComponent;
        this._notificationsTab = NotificationsComponent;

        this._newNotifications = this.notificationsService.getNotifications()
            .map(x => x.filter(x => !x.isRead))
            .map(x => x.length);
    }

    private resetNotifications() {
        this.notificationsService.markNotificationsAsRead();
    }
}