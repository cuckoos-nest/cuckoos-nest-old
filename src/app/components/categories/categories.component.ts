import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

import { Category } from '../../models/photo.models';

import { PhotosService } from '../../services/photos.service';

@Component({
    selector: '<categories></categories>',
    templateUrl: 'categories.html'
})
export class CategoriesComponent {
    
    filteredCategories : Category[];
    allCategories : Category[];

    constructor(private nav: NavController, private photosService: PhotosService) {
        this.photosService.getCategories()
            .subscribe(categories => this.filteredCategories = this.allCategories = categories); 
    }

    private goToCategory(selectedCategory : Category) : void {
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