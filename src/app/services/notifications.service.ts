import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';

import { NotificationModel } from '../models/notification.model';

import Config from '../config.json';

@Injectable()
export class NotificationsService extends BaseService {

    private _observables: Map<number, Observable<NotificationModel>>; 
    private _intervals: Map<number, number>;

    constructor(private http: Http) {
        super();

        this._observables = new Map<number, Observable<NotificationModel>>();
        this._intervals = new Map<number, number>();
    }

    public getNotifications(): Observable<NotificationModel[]> {
        return this.http.get(`${this.notificationDirectory}`)
                .map(bodyResponse => bodyResponse.json());
    }

    public markNotificationsAsRead() {
        this.http.put(`${this.notificationDirectory}`, null);
    }

    public listen(): Observable<NotificationModel> {
        return new Observable<NotificationModel>((observer: Observer<NotificationModel>) => {
                let previousNotifications: NotificationModel[] = new Array<NotificationModel>();

                let intervalFunction = () => {
                    if (Config.debugMode) {
                        console.log(`Notifications interval cycle`);
                    }

                    this.getNotifications().subscribe(notifications => {
                        notifications.forEach(notification => {
                            if (!previousNotifications.find(x => x.id == notification.id)) {
                                if (Config.debugMode) {
                                    console.log(`User received new notification`);
                                }

                                observer.next(notification);
                                previousNotifications.push(notification);
                            }
                        });
                    });
                };

                intervalFunction();
                setInterval(intervalFunction, Config.checkNotificationsDelay);
            });
    }

    public stopListening(userId: number) {
        clearInterval(this._intervals.get(userId));
    }
}