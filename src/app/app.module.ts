import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { WallComponent } from './components/wall/wall.component';
import { WallCardComponent } from './components/wall/wall-card/wall-card.component';
import { SearchComponent } from './components/search/search.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryDetailComponent } from './components/categories/category-detail/category-detail.component';
import { GalleryComponent } from './components/gallery/gallery.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { NotificationsComponent } from './components/notifications/notifications.component'
import { FullscreenImageComponent } from './components/fullscreen-image/fullscreen-image.component';
import { EditUserUploadComponent } from './components/edit-user-upload/edit-user-upload.component';
import { PhotoDetailComponent } from './components/photos/photo-detail/photo-detail.component';
import { WebcamComponent } from './components/webcam/webcam.component';

import { PhotosService } from './services/photos.service';
import { CategoriesService } from './services/categories.service';
import { UsersService } from './services/users.service';
import { WallService } from './services/wall.service';
import { NotificationsService } from './services/notifications.service';
import { UserUploadService } from './services/user-upload.service';
import { WebSocketService } from './services/websocket.service';

import { FacebookWebLoginService } from './services/facebook-web-login.service';
import { FacebookNativeLoginService } from './services/facebook-native-login.service';

import { FacebookService } from 'ng2-facebook-sdk';

import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';

import { SignalRModule, SignalRConfiguration } from 'ng2-signalr';

import Config from './config.json';

const config = new SignalRConfiguration();
config.hubName = 'wall';
config.qs = { };
config.url = (Config.useLocalHost ? Config.localHost : Config.host) + "/"

@NgModule({
  declarations: [
    MyApp,
    MainMenuComponent,
    WallComponent,
    WallCardComponent,
    SearchComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    GalleryComponent,
    UserProfileComponent,
    NotificationsComponent,
    FullscreenImageComponent,
    EditUserUploadComponent,
    PhotoDetailComponent,
    WebcamComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    SignalRModule.configure(config),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainMenuComponent,
    WallComponent,
    WallCardComponent,
    SearchComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    GalleryComponent,
    UserProfileComponent,
    NotificationsComponent,
    FullscreenImageComponent,
    EditUserUploadComponent,
    PhotoDetailComponent,
    WebcamComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PhotosService,
    CategoriesService,
    UsersService,
    FacebookService,
    FacebookNativeLoginService,
    FacebookWebLoginService,
    WallService,
    NotificationsService,
    UserUploadService,
    WebSocketService
  ]
})
export class AppModule { }