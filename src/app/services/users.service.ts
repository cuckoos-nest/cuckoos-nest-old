import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';

import { UserModel } from '../models/user.model';
import { NotificationModel } from '../models/notification.model';

import Config from '../config.json';

@Injectable()
export class UsersService extends BaseService {

    private _loggedInUser: UserModel;
    public get loggedInUser(): UserModel {
        return this._loggedInUser;
    }
    public set loggedInUser(value: UserModel) {
        this._loggedInUser = value;

        if (Config.debugMode) {
            console.log("User logged in", this.loggedInUser);
        }

        // Log user enterance to the databaes
    }

    constructor(private http: Http) {
        super();
    }

    public getUserByFbId(fb_id: number): Observable<UserModel> {
        return this.http.get(`${this.userDirectory}/?fb_id=${fb_id}`)
                .map(bodyResponse => bodyResponse.json());
    }

    public createUser(userModel: UserModel): Observable<UserModel> {
        return this.http.post(`${this.userDirectory}`, userModel)
                .map(bodyResponse => bodyResponse.json());
    }
}