import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {FacebookService, FacebookLoginResponse, FacebookInitParams, FacebookLoginOptions} from 'ng2-facebook-sdk';

import { BaseLoginService, LoginResult } from './base/base-login.service';

import { UserModel } from '../models/user.model';

import { UsersService } from './users.service';

import Config from '../config.json';

@Injectable()
export class GoogleLoginService extends BaseLoginService {

    constructor(private http: Http, private usersService: UsersService) {
        super();
    }

    public login(): Observable<LoginResult> {
        // Not implemented. This is a proof of consept.
        throw {};
    }
}