import { Component } from '@angular/core';

import Config from '../../config.json';

import { NotificationModel } from '../../models/notification.model';
import { UsersService } from '../../services/users.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
    selector: 'notifications',
    templateUrl: 'notifications.html'
})
export class NotificationsComponent {
    private _notifications: NotificationModel[] = new Array<NotificationModel>();

    constructor(private usersService: UsersService, private notificationsService: NotificationsService) {
        this.notificationsService.listen(this.usersService.loggedInUser.id).subscribe(newNotification => {
            this._notifications.push(newNotification);
        });
    }
}