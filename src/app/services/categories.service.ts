import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { BaseService } from './base.service';

import Config from '../config.json';

@Injectable()
export class CategoriesService extends BaseService {

    readonly categoriesDirectory = 'categories';
    readonly photoesDirectory = 'photos';
    readonly host = Config.host + "/";

    constructor(private http: Http) {
        super();
    }

    public getCategories() : Observable<Category[]> {
        return this.http.get(`${this.host}${this.categoriesDirectory}`)
        .map(bodyResponse => bodyResponse.json());
    }

    public getCategoryByName(name: string) : Observable<Category> { //until updated api
        return this.http.get(`${this.host}${this.categoriesDirectory}`)
        .map(bodyResponse => {
            const categories = <Category[]>bodyResponse.json(); 
            return categories.find(category => category.name === name);
        })
    }

    public getCategoryById(id: number) : Observable<Category> {
        return this.http.get(`${this.host}${this.categoriesDirectory}/${id}`)
        .map(bodyResponse => bodyResponse.json());
    }

}