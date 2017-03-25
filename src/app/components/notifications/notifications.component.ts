import { Component } from '@angular/core';

import Config from '../../config.json';
import { NotificationType } from '../../enums/notification-type.enum';

import { NotificationModel } from '../../models/notification.model';
import { UsersService } from '../../services/users.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
    selector: 'notifications',
    templateUrl: 'notifications.html'
})
export class NotificationsComponent {
    private _notifications: NotificationModel[] = new Array<NotificationModel>();

    constructor(private notificationsService: NotificationsService) {
        this.notificationsService.getNewNotifications().subscribe(newNotification => {
            this._notifications = newNotification;
        });
    }

    private notificationTypeToResource(type: NotificationType) {
        return "NOTIFICATION_" + NotificationType[type].toUpperCase();
    }
}