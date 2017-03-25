import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';

import { NotificationModel } from '../models/notification.model';

import Config from '../config.json';

import { WebSocketService, WebSocketResponse, WebSocketResponseType } from '../services/websocket.service';
import { AuthService } from './auth.service';

@Injectable()
export class NotificationsService {
    constructor(private af: AngularFire, private authService: AuthService) {
    }

    public getNewNotifications(): FirebaseListObservable<NotificationModel[]> {
        return this.af.database.list(`/notifications/${this.authService.currentUser.$key}/unread`);
    }

    public markNotificationsAsRead(): void {
        // this.getNewNotifications().update(<Object>{
        //     isRead: true
        // });
    }
}