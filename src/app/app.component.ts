import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TranslateService } from 'ng2-translate';

import { MainMenuComponent } from './components/main-menu/main-menu.component';

import { BaseLoginService } from './services/base/base-login.service';

import { FacebookWebLoginService } from './services/facebook-web-login.service';
import { FacebookNativeLoginService } from './services/facebook-native-login.service';

import { LoginResult } from './enums/login-result.enum';

import * as Config from './config.json';



@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  private rootPage: Component = null;

  constructor(private webLoginService: FacebookWebLoginService, private nativeLoginService: FacebookNativeLoginService, private platform: Platform, translate: TranslateService) {
    Splashscreen.show();

    if (Config.debugMode) {
      console.log("Platform", platform);
    }

    translate.setDefaultLang(Config.defaultLanguage);
    translate.use(Config.defaultLanguage);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  ngOnInit() {

    let loginService: BaseLoginService;

    if (Config.debugMode && Config.useLocalHost) {
      console.warn("Warning: Using local server");
    }

    if (this.platform.is("cordova")) {
      loginService = this.nativeLoginService;
      if (Config.debugMode) {
        console.warn("Native mode");
      }
    }
    else {
      loginService = this.webLoginService;
      if (Config.debugMode) {
        console.warn("Broswer mode");
      }
    }

    loginService.login().subscribe(loginResult => {
      if (loginResult == LoginResult.Succeed) {
        // Login successed
        this.rootPage = MainMenuComponent;
        Splashscreen.hide();
      }
      else {
        // Login failed
        // Temp alert
        alert("Login failed. Reload to try again. (Temp message)");
      }
    });
  }
}
