import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';  
import { CategoryDetailComponent } from './category-detail/category-detail.component';

import { CategoryModel } from '../../models/category.model';

import { CategoriesService } from '../../services/categories.service';

@Component({
    selector: 'categories',
    templateUrl: 'categories.html'
})
export class CategoriesComponent {
    
    filteredCategories : CategoryModel[];
    allCategories : CategoryModel[];

    constructor(private nav: NavController, private categoriesService: CategoriesService, private loadingCtrl: LoadingController) {
        let loader = this.loadingCtrl.create({
            content: "Loading categories..."
        });
        loader.present();

        this.categoriesService.getCategories()
            .subscribe(categories => {
                this.filteredCategories = this.allCategories = categories;
                loader.dismiss();
            }); 
    }

    private goToCategory(selectedCategory : CategoryModel) : void {
        this.nav.push(CategoryDetailComponent, {
            category: selectedCategory
        });
    }

    private filter(ev : any) {
        let val = ev.target.value;

        if (val && val.trim() != '') {
            this.filteredCategories = this.allCategories.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
        else {
            this.filteredCategories = this.allCategories;
        }
    }
}