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

import { PhotosService } from './services/photos.service';
import { CategoriesService } from './services/categories.service';
import { UsersService } from './services/users.service';



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
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PhotosService,
    CategoriesService,
    UsersService
    ]
})
export class AppModule {}
