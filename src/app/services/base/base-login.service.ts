import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { BaseService } from './base.service';

@Injectable()
export abstract class BaseLoginService extends BaseService {
    public abstract login(): Observable<LoginResult>;
}

export class LoginResult {

    public readonly code: number;

    private constructor(code: number) {
        this.code = code;
    }

    public static success = new LoginResult(0);
    public static failed = new LoginResult(1);
}