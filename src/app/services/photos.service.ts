import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Observer } from 'rxjs/Observer';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PhotoModel } from '../models/photo.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';

import Config from '../config.json';

@Injectable()
export class PhotosService {

    constructor(private af: AngularFire, private authService : AuthService,
                private userService : UsersService) { }

    public getPhoto(key: string) : Observable<PhotoModel> {
        return this.af.database.object("/photos/" + key);
    }

    public searchPhotos(searchQuery: string, categoryKey?: string): Observable<PhotoModel[]> {
        let options = {};

        if (categoryKey && categoryKey.length) {
            options = {
                query: {
                    orderByChild: 'category',
                    equalTo: categoryKey 
                }
            };
        }

         return this.af.database.list("/photos", options)
                .map(photos => photos.filter(photo => photo.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1));
    }

    public getPhotosByCategory(categoryKey: string) : Observable<PhotoModel[]> {
        return this.af.database.list(`/categories/${categoryKey}/photos`)
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.getPhoto(key)))
            .switchMap(x => Observable.combineLatest(x));
    }

    public getFollowersPhotoCount(photoKey : string) : Observable<number> {
        return this.af.database.list(`/photo-followers/${photoKey}`)
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.userService.getUser(key)))
            .map(followers => followers.length);
    }

    public follow(photoKey : string) : firebase.Promise<void> {
        return this.af.database.object(`/photo-followers/${photoKey}/${this.authService.currentUser.$key}`).set(true);
    }

    public unfollow(photoKey : string) : firebase.Promise<void> {
        return this.af.database.object(`/photo-followers/${photoKey}/${this.authService.currentUser.$key}`).set(null);
    }
}