import { CommentModel } from './../models/comment.model';
import { UserUploadModel } from './../models/user-upload.model';
import { Observer } from 'rxjs/Observer';
import { AuthService } from './auth.service';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseService } from './base/base.service';
import { PhotoModel } from '../models/photo.model';

import Config from '../config.json';

@Injectable()
export class UserUploadService {

    constructor(private af: AngularFire, private authService: AuthService, @Inject(FirebaseApp) private firebaseApp: any) {
    }

    public getUserUpload(key: string): Observable<UserUploadModel> {
        return this.af.database.object("/uploads/" + key);
    }

    public getUserUploadsByPhoto(photoKey: string): Observable<UserUploadModel[]> {
        return this.af.database.list(`/photos/${photoKey}/uploads/`)
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.getUserUpload(key)))
            .map(userUploads => userUploads.reverse())
            .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));
    }

    public getUserUploadsByUser(uid: string): Observable<UserUploadModel[]> {
        return this.af.database.list(`/users/${uid}/uploads/`)
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.getUserUpload(key)))
            .map(userUploads => userUploads.reverse())
            .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));
    }

    public getWall(): Observable<UserUploadModel[]> {
        return this.af.database.list(`/walls/${this.authService.currentUser.$key}`)
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.getUserUpload(key)))
            .map(userUploads => userUploads.filter(x => x))
            .map(userUploads => userUploads.reverse())
            .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));
    }

    public createUpload(userUpload: UserUploadModel): void {
        let ref = this.firebaseApp.storage().ref(`/images/uploads/${userUpload.user}/${userUpload.photo}/${new Date().toISOString()}`);
        ref
            .putString(userUpload.image, 'data_url')
            .then(() => {
                ref.getDownloadURL().then(url => {
                    userUpload.image = url;
                    this.af.database.list("/uploads").push(userUpload);
                });
            });
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

    public removeComment(photoKey: string, commentKey: string) {
         this.af.database.object(`/upload-comments/${photoKey}/${commentKey}`).set(null);
    }

    public getComments(userUploadKey: string): Observable<CommentModel[]> {
        return this.af.database.list(`/upload-comments/${userUploadKey}/`)
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.getComment(key)))
            .map(comments => comments.reverse())
            .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));
    }

    public getLikesCount(userUploadKey: string): Observable<string> {
        return this.af.database.object(`/uploads/${userUploadKey}/likesCount`);
    }

    public getDateTime(userUploadKey: string): Observable<string> {
        return this.af.database.object(`/uploads/${userUploadKey}/dateTime`);
    }

    public createComment(comment: CommentModel, userUploadKey: string): firebase.Promise<void> {
        let commentKey = this.af.database.list(`/comments`).push(comment).key;
        return this.af.database.object(`/upload-comments/${userUploadKey}/${commentKey}`).set(true);
    }

    public getCommentCount(userUploadKey: string): Observable<number> {
        return this.af.database.object(`/uploads/${userUploadKey}/commentsCount`).map(x => x.$exists() ? x.$value : 0);
    }

    public removeUserUpload(userUploadKey: string): void {
        this.af.database.object(`/uploads/${userUploadKey}`).set(null);
    }

    public hideUserUpload(userUploadKey: string): void {
        this.af.database.object(`/walls/${this.authService.currentUser.$key}/${userUploadKey}`).set(null);
    }

    public searchUserUploads(searchQuery: string): Observable<UserUploadModel[]> {
        return this.af.database.list(`/upload-descriptions/${searchQuery.substring(0, 3)}`)
            .map(references => references.filter(ref => ref.$value.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1))
            .map(references => references.map(ref => ref.$key))
            .map(keys => keys.map(key => this.getUserUpload(key)))
            .switchMap(x => x.length == 0 ? Observable.of(x) : Observable.combineLatest(x));
    }
}