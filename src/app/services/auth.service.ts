import { UserModel } from './../models/user.model';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { AuthProviders, AngularFireAuth, AngularFire, FirebaseAuthState, AuthMethods } from 'angularfire2';

import { Facebook, FacebookLoginResponse } from 'ionic-native';

import { LoginResult } from '../enums/login-result.enum';

import { UsersService } from './users.service';

import Config from '../config.json';
import { BaseService } from './base/base.service';

@Injectable()
export class AuthService {
    private _authState: FirebaseAuthState;

    public get authState(): FirebaseAuthState {
        return this._authState;
    }

    private _currentUser: UserModel;
    public get currentUser(): UserModel {
        return this._currentUser;
    }

    constructor(public auth$: AngularFireAuth, private af: AngularFire, private platform: Platform) {
    }

    public get authenticated(): boolean {
        console.log(this._authState);
        return this._authState !== null;
    }

    public signInWithFacebook(): Observable<FirebaseAuthState> {
        return new Observable<FirebaseAuthState>((observer: Observer<FirebaseAuthState>) => {
            if (this.platform.is('cordova')) {
                Facebook.login(['email', 'public_profile']).then(res => {
                    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                    firebase.auth().signInWithCredential(facebookCredential);
                });
            } 
            else {
                this.auth$.login({
                    provider: AuthProviders.Facebook,
                    method: AuthMethods.Popup
                }).catch(x => {
                    console.log("error", x);
                    debugger;
                });
            }

            this.auth$.subscribe((state: FirebaseAuthState) => {
                this._authState = state;
                debugger;
                if (state) {
                    this.af.database.object("/users/" + state.uid).subscribe(user => this._currentUser = user);
                    observer.next(state);
                }
            });
        });
    }

    public signOut(): void {
        this.auth$.logout();
    }
}