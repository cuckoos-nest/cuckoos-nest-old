import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';  
import { CategoryDetailComponent } from './category-detail/category-detail.component';

import { CategoryModel } from '../../models/category.model';

import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'categories',
    templateUrl: 'categories.html'
})
export class CategoriesComponent implements OnInit {
    filteredCategories : CategoryModel[];
    categories: CategoryModel[];
    _searchQuery: string = '';

    set searchQuery(value: string) {
        this._searchQuery = value;
        this.performSearch(value);
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    constructor(private nav: NavController, private categoryService: CategoryService, private loadingCtrl: LoadingController) {
    }

    ngOnInit(): void {
        let loader = this.loadingCtrl.create({
            content: "Loading categories..."
        });
        loader.present();

        this.categoryService.getAll().subscribe(categories => {
            this.categories = categories;
            this.performSearch(this._searchQuery);
            loader.dismiss();
        });
    }

    private performSearch(query: string) {
        if (query && query.trim() != '') {
            this.filteredCategories = 
                this.categories.filter(item => (item.name.toLowerCase().indexOf(query.toLowerCase()) > -1));
        }
        else {
            this.filteredCategories = this.categories;
        }
    }

    private goToCategory(selectedCategory : CategoryModel) : void {
        this.nav.push(CategoryDetailComponent, {
            category: selectedCategory
        });
    }

    // private filter(ev : any) {
    //     let val = ev.target.value;

    //     if (val && val.trim() != '') {
    //         this.filteredCategories = this.categories.map((items) => items.filter(item => (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)));
    //     }
    //     else {
    //         this.filteredCategories = this.categories;
    //     }
    // }
}