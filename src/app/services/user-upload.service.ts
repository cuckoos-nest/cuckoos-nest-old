import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';

import { UserUploadModel } from '../models/user-upload.model';

import Config from '../config.json';

@Injectable()
export class UserUploadService extends BaseService {

    constructor(private http: Http) {
        super();
    }
}