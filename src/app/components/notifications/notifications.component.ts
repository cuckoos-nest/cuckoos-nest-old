import { WallCardPageComponent } from './../wall/wall-card/wall-card-page/wall-card-page.component';
import { NotificationModel } from './../../models/notification.model';
import { UserModel } from './../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import Config from '../../config.json';
import { NotificationType } from '../../enums/notification-type.enum';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { NavController } from 'ionic-angular';
import { uploadService } from '../../services/upload.service';

@Component({
    selector: 'notifications',
    templateUrl: 'notifications.html'
})
export class NotificationsComponent implements OnInit {
    private notifications: Observable<NotificationModel[]>;
    private users: UserModel[] = [];
    private isLoaded: Boolean;
    private isEmpty: Boolean;

    constructor(private navCtrl: NavController, private userUploadsService: uploadService, 
                private notificationService: NotificationService, private userService: UserService) { }

    ngOnInit(): void {
        this.notifications = this.notificationService.getAll();
        this.notifications.subscribe(notifications => {
            this.isLoaded = true;
            this.isEmpty = notifications.length == 0
        });
    }

    private notificationTypeToResource(type: NotificationType) {
        return "NOTIFICATION_" + NotificationType[type].toUpperCase();
    }

    private clearNotifications(){
        this.notificationService.clearAll();
    }

    private onNotificationClicked(notification: NotificationModel) {
        switch(notification.link) {
            case 'upload':
                this.userUploadsService.get(notification.linkKey).subscribe(upload => {
                    this.navCtrl.push(WallCardPageComponent, {
                        upload
                    });
                });
            break;
        }
    }
}