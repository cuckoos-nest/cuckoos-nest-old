import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map'; 

import { BaseService } from './base/base.service';

import { UserUploadModel } from '../models/user-upload.model';

import { WebSocketService, WebSocketResponse, WebSocketResponseType } from '../services/websocket.service';

import Config from '../config.json';

@Injectable()
export class WallService extends BaseService {
    constructor(private http: Http, private websocketService: WebSocketService) {
        super();
    }

    public getWallItems(from: number, take: number): Observable<UserUploadModel[]> {
        return this.http.get(`${this.userUploadDirectory}?from=${from}&take=${take}`)
                .map(bodyResponse => bodyResponse.json());
    }

    public getWallListener(): Observable<WebSocketResponse<UserUploadModel>> {
        return new Observable<WebSocketResponse<UserUploadModel>>((observer: Observer<WebSocketResponse<UserUploadModel>>) => {
            this.websocketService.listen<UserUploadModel>().subscribe((response: WebSocketResponse<UserUploadModel>) => {
                if (response.ResponseType == WebSocketResponseType.Add) {
                    observer.next(response);
                }
            });
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