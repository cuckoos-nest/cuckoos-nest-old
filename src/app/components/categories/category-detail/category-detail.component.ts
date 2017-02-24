import { Component, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
    selector: '<category-detail></category-detail>',
    templateUrl: 'category-detail.html'
})
export class CategoryDetailComponent {

    items : string[];
    category : string;

    constructor(private navParams: NavParams) {
        this.items = [
            "Apple",
            "Banana",
            "Rotten Banana",
            "Banana Peel",
            "Fat Strawberry",
            "Strawberry",
            "Cut Lemon",
            "Lemon",
            "Watermelon Slice"
        ];

        this.category = navParams.get('category');
    }    

    private takePhoto(item : string) : void {

        Camera.getPicture().then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
        // Handle error
        });
    }
}