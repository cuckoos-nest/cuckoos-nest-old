import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseService } from './base.service';

import Config from '../config.json';

@Injectable()
export class PhotosService extends BaseService {

    constructor(private http: Http) {
        super();
    }

    public getPhotos() : Observable<Photo[]> {
        return this.http.get(`${this.host}${this.photoesDirectory}`)
            .map(bodyResponse => bodyResponse.json());
    }

    public getPhotoById(id: number) : Observable<Photo> {
        return this.http.get(`${this.host}${this.photoesDirectory}`)
            .map(bodyResponse => bodyResponse.json());
    }

    public getPhotosByCategory(categoryId: number) : Observable<Photo[]> {
        return this.http.get(`${this.host}${this.photoesDirectory}/?category=${categoryId}`)
            .map(bodyResponse => bodyResponse.json());
    }
}