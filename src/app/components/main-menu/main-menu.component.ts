import { Observable } from 'rxjs/Observable';
import { Component, ViewChild } from '@angular/core';
import { WallComponent } from '../wall/wall.component';
import { SearchComponent } from '../search/search.component';
import { CategoriesComponent } from '../categories/categories.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { NotificationsComponent } from '../notifications/notifications.component';

import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

import { NotificationModel } from '../../models/notification.model';


import { NavController, NavParams } from 'ionic-angular';
import { EditUserUploadComponent } from '../edit-user-upload/edit-user-upload.component';
import { PhotoService } from '../../services/photo.service';
import { PhotoModel } from '../../models/photo.model';
import { CategoryModel } from '../../models/category.model';
import { UploadModel } from '../../models/upload.model';

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

    constructor(private notificationService: NotificationService) {
        let isEditDebug: Boolean = false;

        this._wallTab = WallComponent;
        this._searchTab = SearchComponent;
        this._addTab = CategoriesComponent;
        this._profileTab = UserProfileComponent;
        this._notificationsTab = NotificationsComponent;

        this._newNotifications = this.notificationService.getAll()
            .map(x => x.filter(x => !x.isRead))
            .map(x => x.length);
    }

    private resetNotifications() {
        this.notificationService.markAllAsRead();
    }
}