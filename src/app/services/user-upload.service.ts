import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';
import { PhotoModel } from '../models/photo.model';
import { UserUploadModel } from './../models/user-upload.model';

import Config from '../config.json';

@Injectable()
export class UserUploadService extends BaseService {

    constructor(private http: Http) {
        super();
    }

    public getMostPopularPhotosByPhotoId(id : number, from?: number, take?: number) : Observable<UserUploadModel[]> {
        if (from >= 0 && take >= 0)
            return this.http.get(`${this.userUploadDirectory}/popular/photos/${id}/${from}/${take}`).map(userUploads => userUploads.json());
        else if (from >= 0)
            return this.http.get(`${this.userUploadDirectory}/popular/photos/${id}/${from}`).map(userUploads => userUploads.json());
        else
            return this.http.get(`${this.userUploadDirectory}/popular/photos/${id}`).map(userUploads => userUploads.json());
    }

    public getUploadsByUser(userId: number): Observable<UserUploadModel[]> {
        return this.http.get(`${this.userUploadDirectory}?userId=${userId}`)
            .map(userUploads => userUploads.json());
    }
}