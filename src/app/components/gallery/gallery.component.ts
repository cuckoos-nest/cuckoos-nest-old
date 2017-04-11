import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { PhotoModel } from '../../models/photo.model';

@Component({
    selector: 'gallery',
    templateUrl: 'gallery.html'
})
export class GalleryComponent implements OnChanges {
    private rows: Array<Array<any>>;

    @Input() items: any[];

    @Input() imageMember : (item : any) => string;
    
    @Input() titleMember : (item : any) => string;

    @Input() labelMember : (item : any) => string;

    @Input() columns : number = 2;


    @Output() itemClick = new EventEmitter<any>();

    itemClicked(item: any) {
        this.itemClick.emit(item);
    } 

    ngOnChanges(changes: SimpleChanges): void {
        this.rows = [];

        if (this.items) {
            let currentNumberOfColumns : number = 0;
            let currentRow : number = 0;

            this.rows.push([]);

            for (let item of this.items) {
                if (currentNumberOfColumns > (this.columns - 1)) {
                    currentNumberOfColumns = 0;
                    this.rows.push([]);
                    currentRow++;
                }

                this.rows[currentRow].push(item);

                currentNumberOfColumns++;
            }
        }
    }
}