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

import { PhotosService } from './services/photos.service';
import { CategoriesService } from './services/categories.service';
import { UsersService } from './services/users.service';
import { WallService } from './services/wall.service';
import { NotificationsService } from './services/notifications.service';
import { FacebookLoginService } from './services/facebook-login.service';

import { FacebookService } from 'ng2-facebook-sdk';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';

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
    ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
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
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PhotosService,
    CategoriesService,
    UsersService,
    FacebookService,
    FacebookLoginService,
    WallService,
    NotificationsService
    ]
})
export class AppModule {}