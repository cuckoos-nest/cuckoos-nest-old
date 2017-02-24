import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'gallery',
    templateUrl: 'gallery.html'
})
export class GalleryComponent implements OnChanges {

    rows : Array<Array<any>>;

    @Input()
    set items(value : any[]) {
        this.rows = new Array<Array<any>>();

        if (value) {
            let currentNumberOfColumns : number = 0;
            let currentRow : number = 0;

            this.rows.push(new Array<any>());

            for (let item of value) {
                if (currentNumberOfColumns > 3) {
                    currentNumberOfColumns = 0;
                    this.rows.push(new Array<any>());
                    currentRow++;
                }

                this.rows[currentRow].push(item);

                currentNumberOfColumns++;
            }
        }
    }

    constructor() {        
        
    } 

    ngOnChanges(changes: SimpleChanges) {
        changes
    }
}