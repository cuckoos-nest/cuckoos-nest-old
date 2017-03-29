import { NotificationModel } from './../models/notification.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';

import Config from '../config.json';

import { WebSocketService, WebSocketResponse, WebSocketResponseType } from '../services/websocket.service';
import { AuthService } from './auth.service';

@Injectable()
export class NotificationsService {
    constructor(private af: AngularFire, private authService: AuthService) {
    }

    public getNotifications(): Observable<NotificationModel[]> {
        return this.af.database.list(`/notifications/${this.authService.currentUser.$key}`, {
            query: {
                orderByChild: 'createdAt',
            },
        })
        .map(notifications => notifications.reverse());
    }

    public getNotificationsOnce(): Observable<any> {
        return this.af.database.list(`/notifications/${this.authService.currentUser.$key}`, {
            query: {
                orderByChild: 'createdAt',
            },
            preserveSnapshot: true 
        });
    }

    public markNotificationsAsRead(): void {
        let sub = this.getNotifications().subscribe(notifications => {
            for (let notification of notifications) {
                if (!notification.isRead) {
                    this.markAsRead(notification.$key);
                }
            }

            sub.unsubscribe();
        });
    }

    private markAsRead(key: string): firebase.Promise<void> {
        return this.af.database.object(`/notifications/${this.authService.currentUser.$key}/${key}/isRead`).set(true);
    }
}