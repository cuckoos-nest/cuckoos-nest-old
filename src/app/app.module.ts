import { Transfer } from 'ionic-native/dist/es5';
import { UserPipe } from './pipes/user.pipe';
import { CommentsComponent } from './components/comments/comments.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';

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
import { LikeListComponent } from './components/like-list/like-list.component';

import { PhotosService } from './services/photos.service';
import { CategoriesService } from './services/categories.service';
import { NotificationsService } from './services/notifications.service';
import { UserUploadService } from './services/user-upload.service';
import { AuthService } from './services/auth.service';
import { UploadLikesService } from './services/upload-likes.services';
import { FacebookService } from 'ng2-facebook-sdk';

import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';

import Config from './config.json';
import { UsersService } from './services/users.service';

export const firebaseConfig = {
  apiKey: 'AIzaSyBz1z_mA1sZsQNYTh8RK8p76aE_gU-xcGc',
  authDomain: 'cuckoos-nest-7a4cf.firebaseapp.com',
  databaseURL: 'https://cuckoos-nest-7a4cf.firebaseio.com',
  storageBucket: 'cuckoos-nest-7a4cf.appspot.com',
  messagingSenderId: '374424090153'
};


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
    WebcamComponent,
    CommentsComponent,
    LikeListComponent,
    UserPipe,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
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
    WebcamComponent,
    CommentsComponent,
    LikeListComponent,
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UsersService,
    PhotosService,
    CategoriesService,
    FacebookService,
    AuthService,
    NotificationsService,
    UserUploadService,
    UploadLikesService,
    Transfer
  ]
})
export class AppModule { }