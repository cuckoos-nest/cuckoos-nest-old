import { Component } from '@angular/core';
import { WallComponent } from '../wall/wall.component';
import { SearchComponent } from '../search/search.component';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
    selector: '<main-menu></main-menu>',
    templateUrl: 'main-menu.html'
})
export class MainMenuComponent {

    wallTab: any;
    searchTab: any;
    addTab: any;

    constructor() {
        this.wallTab = WallComponent;
        this.searchTab = SearchComponent;
        this.addTab = CategoriesComponent;
    }    
}