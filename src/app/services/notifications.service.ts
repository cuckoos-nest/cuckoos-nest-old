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

    public getNotifications(userId: number): Observable<NotificationModel[]> {
        return this.http.get(`${this.notificationDictionary}?userId=${userId}`)
                .map(bodyResponse => bodyResponse.json());
    }

    public markNotificationsAsRead(userId: number) {
        this.http.put(`${this.notificationDictionary}?userId=${userId}`, null);
    }

    public listen(userId: number): Observable<NotificationModel> {
        if (this._observables.has(userId)) {
            return this._observables.get(userId);
        }
        else {
            if (Config.debugMode) {
                console.log(`New notification observer has been created for user: ${userId}`);
            }

            let observable: Observable<NotificationModel> = new Observable<NotificationModel>((observer: Observer<NotificationModel>) => {
                let previousNotifications: NotificationModel[] = new Array<NotificationModel>();

                let intervalFunction = () => {
                    if (Config.debugMode) {
                        console.log(`Notifications interval cycle for user ${userId}`);
                    }

                    this.getNotifications(userId).subscribe(notifications => {
                        notifications.forEach(notification => {
                            if (!previousNotifications.find(x => x.id == notification.id)) {
                                if (Config.debugMode) {
                                    console.log(`User ${userId} received new notification`);
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

            this._observables.set(userId, observable);

            return observable;
        }
    }

    public stopListening(userId: number) {
        clearInterval(this._intervals.get(userId));
    }
}