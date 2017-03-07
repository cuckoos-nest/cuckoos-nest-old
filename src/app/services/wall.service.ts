import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';

import { UserUploadModel } from '../models/user-upload.model';

import { WebSocketHelper, WebSocketResponse, WebSocketResponseType } from '../helpers/websocket.helper';

import Config from '../config.json';

@Injectable()
export class WallService extends BaseService {
    constructor(private http: Http) {
        super();
    }

    public getWallListener(): Observable<UserUploadModel> {
        return new Observable<UserUploadModel>((observer: Observer<UserUploadModel>) => {
            let lastUploadId: number = 0;
            
            let intervalFunction = () => {
                this.http.get(`${this.wallDirectory}`)
                .map(bodyResponse => bodyResponse.json()).subscribe((wall: UserUploadModel[]) => {
                    for (let userUpload of wall.reverse()) {
                        if (userUpload.id > lastUploadId) {
                            lastUploadId = userUpload.id;
                            observer.next(userUpload);
                        }
                    }
                });
            };
            intervalFunction();
            setInterval(intervalFunction, Config.checkNotificationsDelay);
        });
    }

    public getWallListenerWs() {
        WebSocketHelper.listen<UserUploadModel>().subscribe((response: WebSocketResponse<UserUploadModel>) => {
            console.log("new wall item", response);
        });
    }

    public share(userUpload: UserUploadModel): Observable<UserUploadModel> {
        return this.http.post(`${this.userUploadDirectory}`, userUpload)
                .map(bodyResponse => bodyResponse.json());
    }

    public like(userUploadId: number): Observable<Response> {
        return this.http.post(`${this.likeDirectory}?userUploadId=${userUploadId}`, null);
    }

    public unlike(userUploadId: number): Observable<Response> {
        return this.http.delete(`${this.likeDirectory}?userUploadId=${userUploadId}`, null);
    }
}