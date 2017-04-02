import { UserModel } from './../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import Config from '../../config.json';
import { NotificationType } from '../../enums/notification-type.enum';

import { NotificationModel } from '../../models/notification.model';
import { UsersService } from '../../services/users.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
    selector: 'notifications',
    templateUrl: 'notifications.html'
})
export class NotificationsComponent implements OnInit {
    private _notifications: Observable<NotificationModel[]>;
    private _users = new Array<UserModel>();
    private _isLoaded: Boolean;
    private _isEmpty: Boolean;

    constructor(private notificationsService: NotificationsService, private usersService: UsersService) {
    }

    ngOnInit(): void {
        this._notifications = this.notificationsService.getNotifications();
        this._notifications.subscribe( notifications => {
            this._isLoaded = true;
            this._isEmpty = notifications.length == 0
            });
    }

    private notificationTypeToResource(type: NotificationType) {
        return "NOTIFICATION_" + NotificationType[type].toUpperCase();
    }

    private clearNotifications(){
        this.notificationsService.clearAll();
    }
}