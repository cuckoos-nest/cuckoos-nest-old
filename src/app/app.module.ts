import { WallCardPageComponent } from './components/wall/wall-card/wall-card-page/wall-card-page.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { Transfer } from '@ionic-native/transfer';
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

import { PhotoService } from './services/photo.service';
import { CategoryService } from './services/category.service';
import { NotificationService } from './services/notification.service';
import { uploadService } from './services/upload.service';
import { AuthService } from './services/auth.service';
import { LikeService } from './services/like.service';
import { FacebookService } from 'ng2-facebook-sdk';

import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';

import Config from './config.json';
import { UserService } from './services/user.service';
import { CommentService } from './services/comment.service';

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
    UsersListComponent,
    WallCardPageComponent,
    
    UserPipe,
    OrderByPipe,
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
    UsersListComponent,
    WallCardPageComponent,
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    PhotoService,
    CategoryService,
    FacebookService,
    AuthService,
    NotificationService,
    uploadService,
    LikeService,
    CommentService,
    Transfer
  ]
})
export class AppModule { }