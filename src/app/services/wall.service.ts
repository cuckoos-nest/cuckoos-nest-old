import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';

import { UserUploadModel } from '../models/user-upload.model';

import Config from '../config.json';

@Injectable()
export class WallService extends BaseService {
    constructor(private http: Http) {
        super();
    }

    public getWallByUser(userId: number): Observable<UserUploadModel[]> {
        return this.http.get(`${this.wallDirectory}?userId=${userId}`)
            .map(bodyResponse => bodyResponse.json());
    }

    public like(userUploadId: number): Observable<Response> {
        return this.http.post(`${this.likeDirectory}?userUploadId=${userUploadId}`, null);
    }

    public unlike(userUploadId: number): Observable<Response> {
        return this.http.delete(`${this.likeDirectory}?userUploadId=${userUploadId}`, null);
    }
}