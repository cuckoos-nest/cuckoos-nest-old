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
    
    categories : Category[];

    constructor(private nav: NavController, private photosService: PhotosService) {
        this.initItems();
    }   

    private initItems() {
        //this.categories = new Array<Category>();
        this.photosService.getCategories()
        .subscribe(categories => this.categories = categories);
    } 

    private goToCategory(category : string) : void {
        this.nav.push(CategoryDetailComponent, {
            category: category
        });
    }

    // private filter(ev : any) {
    //     let val = ev.target.value;
        
    //     this.initItems();

    //     if (val && val.trim() != '') {
    //         this.categories = this.categories.filter((item) => {
    //             return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //         })
    //     }
    // }
}