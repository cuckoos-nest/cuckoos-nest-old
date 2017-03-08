import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Category, Photo } from '../models/photo.models';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

import { Facebook, FacebookLoginResponse } from 'ionic-native';

import { BaseLoginService } from './base/base-login.service';

import { UserModel } from '../models/user.model';

import { LoginResult } from '../enums/login-result.enum';

import { UsersService } from './users.service';

import Config from '../config.json';

@Injectable()
export class FacebookNativeLoginService extends BaseLoginService {

    constructor(private http: Http, private usersService: UsersService) {
        super();
    }

    public login(): Observable<LoginResult> {
        let result: Observable<LoginResult> = new Observable<LoginResult>((observer: Observer<LoginResult>) => {
            // Attempt to perform facebook login
            Facebook.getLoginStatus().then(fbResponse => {
                let isConnected: Boolean = (fbResponse.status === "connected");

                if (!isConnected) {
                    // The facebook account is not connected to the application, ask him for permissions
                    Facebook.login(['email','public_profile']).then((response: FacebookLoginResponse) => {
                        if (Config.debugMode) {
                            console.log("New facebook connection established");
                        }
                        
                        this.setLoggedInUser(Number(response.authResponse.userID), observer);
                    },
                    (error: any) => {
                        // Facebook login error occured
                        if (Config.debugMode) {
                            console.error("Facebook login error:", error);
                        }

                        observer.next(LoginResult.Failed);
                        observer.complete();
                    });
                }
                else {
                    // The facebook account is already connected
                    if (Config.debugMode) {
                        console.log("Facebook is already connected");
                    }

                    this.setLoggedInUser(Number(fbResponse.authResponse.userID), observer);
                }
            });
        });

        return result;
    }

    private setLoggedInUser(fb_id: number, observer: Observer<LoginResult>) {
         this.getUserModel(Number(fb_id)).subscribe(userModel => {
            if (userModel) {
                // Facebook user exists, or created successfuly
                this.usersService.loggedInUser = userModel;
                observer.next(LoginResult.Succeed);
            }
            else {
                // Unable to create facebook user
                observer.next(LoginResult.Failed);
            }

            observer.complete();
        });
    }

    private toDataUrl(url: string, callback: any) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    private getUserModel(fb_id: number): Observable<UserModel> {
        let result: Observable<UserModel> = new Observable<UserModel>((observer: Observer<UserModel>) => {
            this.usersService.getUserByFbId(fb_id)
                .subscribe(userModel => {
                    
                    if (Config.debugMode) {
                        console.log("Facebook account is already in the database", userModel);
                    }

                    observer.next(userModel);
                    observer.complete();
                },  
                err => {
                    Facebook.api("/me?fields=name,email,picture", []).then(me => {
                        if (Config.debugMode) {
                            console.log("facebook /me response", me);
                        }
                        
                        let newUser: UserModel = new UserModel();
                        newUser.fb_id = fb_id;
                        newUser.displayName = me.name;
                        newUser.email = me.email;
                        this.toDataUrl(me.picture.data.url, (data: string) => {
                            newUser.image = data.substring('data:image/jpeg;base64,'.length);

                            this.usersService.createUser(newUser)
                                .subscribe(userModel => {
                                    if (Config.debugMode) {
                                        console.log("New Facebook User has been created", userModel);
                                    }
                                    
                                    observer.next(userModel);
                                    observer.complete();
                                },
                                err => {
                                    if (Config.debugMode) {
                                        console.log("error", err);
                                    }
                                    observer.next(null);
                                    observer.complete();
                                });
                        });
                    });
                });
        });

        return result;
    }
}