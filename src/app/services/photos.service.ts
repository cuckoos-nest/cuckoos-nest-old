import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PhotoModel } from '../models/photo.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseService } from './base.service';

import Config from '../config.json';

@Injectable()
export class PhotosService extends BaseService {

    constructor(private http: Http) {
        super();
    }

    public getPhotos() : Observable<PhotoModel[]> {
        return this.http.get(`${this.photoesDirectory}`)
            .map(bodyResponse => bodyResponse.json());
    }

    public getPhotoById(id: number) : Observable<PhotoModel> {
        return this.http.get(`${this.photoesDirectory}`)
            .map(bodyResponse => bodyResponse.json());
    }

    public getPhotosByCategory(categoryId: number) : Observable<PhotoModel[]> {
        return this.http.get(`${this.photoesDirectory}?category=${categoryId}`)
            .map(bodyResponse => bodyResponse.json());
    }
}