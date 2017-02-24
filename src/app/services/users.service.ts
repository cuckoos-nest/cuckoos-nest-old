import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseService } from './base.service';

import Config from '../config.json';

@Injectable()
export class UsersService extends BaseService {

    constructor(private http: Http) {
        super();
    }
}