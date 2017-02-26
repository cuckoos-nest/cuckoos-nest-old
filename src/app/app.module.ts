import { NgModule, ErrorHandler } from '@angular/core';
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

import { PhotosService } from './services/photos.service';
import { CategoriesService } from './services/categories.service';
import { UsersService } from './services/users.service';
import { WallService } from './services/wall.service';
import { FacebookLoginService } from './services/facebook-login.service';

import { FacebookService } from 'ng2-facebook-sdk';

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
    ],
  imports: [
    IonicModule.forRoot(MyApp)
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
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PhotosService,
    CategoriesService,
    UsersService,
    FacebookService,
    FacebookLoginService,
    WallService
    ]
})
export class AppModule {}
