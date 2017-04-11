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
    private wallTab: Component;
    private searchTab: Component;
    private addTab: Component;
    private profileTab: Component;
    private notificationsTab: Component;
    private newNotifications: Observable<number>;

    constructor(private notificationService: NotificationService) {
        this.wallTab = WallComponent;
        this.searchTab = SearchComponent;
        this.addTab = CategoriesComponent;
        this.profileTab = UserProfileComponent;
        this.notificationsTab = NotificationsComponent;

        this.newNotifications = this.notificationService.countUnread();
    }

    private resetNotifications() {
        this.notificationService.markAllAsRead();
    }
}