import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { PhotoModel } from '../../models/photo.model';

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

    @Input()
    imageMember : (item : any) => string;
    
    @Input()
    titleMember : (item : any) => string;

    @Output()
    onItemClicked = new EventEmitter<any>();

    itemClicked(item: any) {
        this.onItemClicked.emit(item);
    }

    constructor() {        
        
    } 

    ngOnChanges(changes: SimpleChanges) {
        changes
    }
}