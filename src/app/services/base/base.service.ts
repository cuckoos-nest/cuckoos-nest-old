import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Config from '../../config.json';

@Injectable()
export abstract class BaseService {
    protected readonly host = Config.host + "/";
    protected readonly categoriesDirectory = this.host + "categories";
    protected readonly photoesDirectory = this.host + "photos";
    protected readonly userDirectory = this.host + "users";
    protected readonly wallDirectory = this.host + "wall";
    protected readonly notificationDictionary = this.host + "notifications";

    protected handleError (error: Response | any) {
        // log error
    }
}