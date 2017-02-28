import { Component, ViewChild } from '@angular/core';
import { WallComponent } from '../wall/wall.component';
import { SearchComponent } from '../search/search.component';
import { CategoriesComponent } from '../categories/categories.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { NotificationsComponent } from '../notifications/notifications.component';

import { UsersService } from '../../services/users.service';
import { NotificationsService } from '../../services/notifications.service';

import { NotificationModel } from '../../models/notification.model';

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

    private _newNotifications: number = 0;

    constructor(private notificationsService: NotificationsService, private usersService: UsersService) {
        this._wallTab = WallComponent;
        this._searchTab = SearchComponent;
        this._addTab = CategoriesComponent;
        this._profileTab = UserProfileComponent;
        this._notificationsTab = NotificationsComponent;

        this.notificationsService.listen(this.usersService.loggedInUser.id).subscribe(() => {
            this._newNotifications++;
            console.log("Received notification in main-menu.component");
        });
    }

    private resetNotifications() {
        this._newNotifications = 0;
        this.notificationsService.markNotificationsAsRead(this.usersService.loggedInUser.id);
    }
}