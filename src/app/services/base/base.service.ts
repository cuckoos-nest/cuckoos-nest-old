import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Config from '../../config.json';

@Injectable()
export abstract class BaseService {
    readonly host = Config.host + "/";
    readonly categoriesDirectory = this.host + "categories";
    readonly photoesDirectory = this.host + "photos";
    readonly userDirectory = this.host + "users";

    protected handleError (error: Response | any) {
        // log error
    }
}