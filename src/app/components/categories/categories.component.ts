import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

@Component({
    selector: '<categories></categories>',
    templateUrl: 'categories.html'
})
export class CategoriesComponent {
    
    categories : string[];

    constructor(private nav: NavController) {
        this.initItems();
    }   

    private initItems() {
        this.categories = [
            "Animals",
            "Food",
            "Fruits",
            "Furnitures",
            "Cartoons",
            "Sexy Famous",
            "Celebs",
            "Electronics",
            "TV Series",
            "Movies",
        ];
    } 

    private goToCategory(category : string) : void {
        this.nav.push(CategoryDetailComponent, {
            category: category
        });
    }

    private filter(ev : any) {
        let val = ev.target.value;
        
        this.initItems();

        if (val && val.trim() != '') {
            this.categories = this.categories.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }
}