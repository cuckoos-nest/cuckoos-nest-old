import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';

import { UserUploadModel } from '../models/user-upload.model';
import { PhotoModel } from '../models/photo.model';

import Config from '../config.json';

@Injectable()
export class UserUploadService extends BaseService {

    constructor(private http: Http) {
        super();
    }

    getMostPopularPhotosByPhotoId(id : number, from?: number, take?: number) : Observable<UserUploadModel[]> {
        if (from && from != 0 && take && take != 0)
            return this.http.get(`${this.userUploadDirectory}/popular/photos/${id}/${from}/${take}`).map(userUploads => userUploads.json());
        else if (from && from != 0)
            return this.http.get(`${this.userUploadDirectory}/popular/photos/${id}/${from}`).map(userUploads => userUploads.json());
        else
            return this.http.get(`${this.userUploadDirectory}/popular/photos/${id}`).map(userUploads => userUploads.json());
    }
}