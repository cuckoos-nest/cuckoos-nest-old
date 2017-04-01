import { CommentModel } from './../models/comment.model';
import { UserUploadModel } from './../models/user-upload.model';
import { Observer } from 'rxjs/Observer';
import { AuthService } from './auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';
import { PhotoModel } from '../models/photo.model';

import Config from '../config.json';

@Injectable()
export class UserUploadService {

    constructor(private af: AngularFire, private authService: AuthService) {
    }

    // public getMostPopularPhotosByPhotoId(id : number, from?: number, take?: number) : Observable<UserUploadModel[]> {
    //     if (from && from != 0 && take && take != 0)
    //         return this.http.get(`${this.userUploadDirectory}/popular/photos/${id}/${from}/${take}`).map(userUploads => userUploads.json());
    //     else if (from && from != 0)
    //         return this.http.get(`${this.userUploadDirectory}/popular/photos/${id}/${from}`).map(userUploads => userUploads.json());
    //     else
    //         return this.http.get(`${this.userUploadDirectory}/popular/photos/${id}`).map(userUploads => userUploads.json());
    // }

    public getUserUpload(key: string) : Observable<UserUploadModel> {
        return this.af.database.object("/uploads/" + key);
    }

    public getUserUploadsByPhoto(photoKey: string) : Observable<UserUploadModel[]> {
        return this.af.database.list(`/photos/${photoKey}/uploads/`)
                    .map(references => references.map(ref => ref.$key))
                    .map(keys => keys.map(key => this.getUserUpload(key)))
                    .map(userUploads => userUploads.reverse())
                    .switchMap(x => Observable.combineLatest(x));
    }

    public getUserUploadsByUser(uid: string) : Observable<UserUploadModel[]> {
        return this.af.database.list(`/users/${uid}/uploads/`)
                    .map(references => references.map(ref => ref.$key))
                    .map(keys => keys.map(key => this.getUserUpload(key)))
                    .map(userUploads => userUploads.reverse())
                    .switchMap(x => Observable.combineLatest(x));
    }

    public getWall(): Observable<UserUploadModel[]> {
         return this.af.database.list(`/walls/${this.authService.currentUser.$key}`)
                    .map(references => references.map(ref => ref.$key))
                    .map(keys => keys.map(key => this.getUserUpload(key)))
                    .map(userUploads => userUploads.reverse())
                    .switchMap(x => Observable.combineLatest(x));
    }

    public createUpload(userUpload: UserUploadModel): void {
        this.af.database.list("/uploads").push(userUpload);
    }

    public like(userUploadKey: string): void {
        this.af.database.object(`/upload-likes/${userUploadKey}/${this.authService.currentUser.$key}`).set(true);
    }

    public unlike(userUploadKey: string): void {
        this.af.database.object(`/upload-likes/${userUploadKey}/${this.authService.currentUser.$key}`).set(null);
    }

    public getLikes(userUploadKey: string): Observable<string[]> {
        return this.af.database.list(`/upload-likes/${userUploadKey}`)
                    .map(references => references.map(ref => ref.$key));
    }

    public getComment(commentKey: string): Observable<CommentModel> {
        return this.af.database.object("/comments/" + commentKey);
    }

    public getComments(userUploadKey: string): Observable<CommentModel[]> {
        return this.af.database.list(`/upload-comments/${userUploadKey}/`)
                    .map(references => references.map(ref => ref.$key))
                    .map(keys => keys.map(key => this.getComment(key)))
                    .map(comments => comments.reverse())
                    .switchMap(x => Observable.combineLatest(x));
    }

    public getLikesCount(userUploadKey: string): Observable<string>{
        return this.af.database.object(`/uploads/${userUploadKey}/likesCount`);
    }

     public getDateTime(userUploadKey: string): Observable<string>{
        return this.af.database.object(`/uploads/${userUploadKey}/dateTime`);
    }

    public createComment(comment: CommentModel, userUploadKey: string) {
        let commentKey = this.af.database.list(`/comments`).push(comment).key;
        this.af.database.object(`/upload-comments/${userUploadKey}/${commentKey}`).set(true);
    }

    public getCommentCount(userUploadKey: string): Observable<number> {
        return this.af.database.object(`/uploads/${userUploadKey}/commentsCount`).map(x => x.val());
    }
}