import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {FacebookService, FacebookLoginResponse, FacebookInitParams, FacebookLoginOptions} from 'ng2-facebook-sdk';

import { MainMenuComponent } from './components/main-menu/main-menu.component';

import { UsersService } from './services/users.service';

import * as Config from './config.json';

@Component({
  templateUrl: 'app.html',
  providers: [FacebookService]
})
export class MyApp implements OnInit{
  rootPage = null;

  constructor(private fb: FacebookService, private usersService: UsersService, platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.initFacebookApi();
  }

  private initFacebookApi() {
      let fbParams: FacebookInitParams = {
                              appId: Config.facebookAppId,
                              xfbml: true,
                              version: 'v2.6'
                              };
      this.fb.init(fbParams);
  }

  private fbLogin() {
    let fbOptions: FacebookLoginOptions = {
    };

    this.fb.login(fbOptions).then(
    (response: FacebookLoginResponse) => {
      this.usersService.LoginViaFacebook(Number(response.authResponse.userID));
      this.rootPage = MainMenuComponent;
    },
    (error: any) => console.error(error));
  }

    ngOnInit() {
      this.fb.getLoginStatus().then(fbResponse => {
        let isConnected = (fbResponse.status === "connected");

        if (!isConnected)
          this.fbLogin();
        else {
          this.usersService.LoginViaFacebook(Number(fbResponse.authResponse.userID));
          this.rootPage = MainMenuComponent;
        }
      });
    }
}
