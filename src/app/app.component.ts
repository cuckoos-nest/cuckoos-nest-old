import { AngularFire } from 'angularfire2';
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
import { AuthService } from './services/auth.service';
import { CategoryModel } from './models/category.model';
import { CategoriesService } from './services/categories.service';



@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  private rootPage: Component = null;

  constructor(private platform: Platform, private _auth: AuthService, translate: TranslateService, private af: AngularFire, private test: CategoriesService) {
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
    this._auth.signInWithFacebook()
      .subscribe(() => {
        if (this._auth.authenticated) {
          this.test.getCategories().subscribe(x => console.log("categories: ", x.map(y => y.$key)));
          this.rootPage = MainMenuComponent;
          Splashscreen.hide();
        }
        else {
          alert("Login failed. Reload to try again. (Temp message)");
        }
      });
  }
}
