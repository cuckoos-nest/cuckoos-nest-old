import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import * as Config from '../config.json';

@Injectable()
export class PhotosService {
    constructor(private http: Http) {
    }
 
    private getCategories() : Category {
        this.http.get(Config.host + "/categories/").map(response => response.json()).subscribe(jsonResponse => {
            
        });
    }
}