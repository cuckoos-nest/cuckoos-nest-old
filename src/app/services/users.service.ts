import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseService } from './base.service';

import { UserModel } from '../models/user.model';

import Config from '../config.json';

@Injectable()
export class UsersService extends BaseService {

    private _loggedInUser: UserModel;
    public get loggedInUser(): UserModel {
        return this._loggedInUser;
    }

    constructor(private http: Http) {
        super();
    }

    public LoginViaFacebook(fb_id: number) {
        this.http.get(`${this.userDirectory}/?fb_id=${fb_id}`)
            .map(bodyResponse => bodyResponse.json())
            .subscribe(user => {
                if (!user) {
                    let userModel: UserModel = new UserModel();
                    userModel.fb_id = fb_id;

                    this.http.post(`${this.userDirectory}`, userModel).map(bodyResponse => bodyResponse.json())
                    .subscribe(newUser => {
                        this._loggedInUser = newUser;
                    console.log("New user has been registered", newUser);
                    });
                }
                else {
                    this._loggedInUser = user;
                    console.log("User is already registerd", user);
                }
            });
    }

    public LoginViaGoogle() {

    }

    public Register() {

    }

    public Login() {

    }
}