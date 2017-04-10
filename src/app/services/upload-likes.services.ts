import { CommentModel } from './../models/comment.model';
import { UploadLikeModel } from './../models/upload-likes.model';
import { Observer } from 'rxjs/Observer';
import { AuthService } from './auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';
import { PhotoModel } from '../models/photo.model';
import { UserModel } from '../models/user.model';
import Config from '../config.json';

@Injectable()
export class UploadLikesService {

    constructor(private af: AngularFire, private authService: AuthService) {
    }

    public getLikes(userUploadKey: string): Observable<UserModel[]> {
        return this.af.database.list(`/upload-likes/${userUploadKey}`)
                    .map(references => references.map(ref => ref.$key))
                    .map(keys => keys.map(key => this.getLikeUser(key)))
                    .map(users => users.reverse())
                    .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));

    }

    public getLikeUser(userKey: string): Observable<UserModel> {
        return this.af.database.object("/users/" + userKey);
    }
   
}