import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MainMenuComponent } from './components/main-menu/main-menu.component';

import { FacebookLoginService } from './services/facebook-login.service';
import { LoginResult } from './services/base/base-login.service';

import * as Config from './config.json';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  rootPage = null;

  constructor(private loginService: FacebookLoginService, platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

    ngOnInit() {
      this.loginService.login().subscribe(loginResult => {
        if (loginResult == LoginResult.success) {
          // Login successed
          this.rootPage = MainMenuComponent;
          Splashscreen.hide();
        }
        else {
          // Login failed
          // Temp alert
          alert("Login failed");
        }
      });
    }
}
