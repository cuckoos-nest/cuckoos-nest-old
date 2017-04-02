import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'search',
    templateUrl: 'search.html'
})
export class SearchComponent implements OnInit {
    private _searchType: string;

    constructor() {
    }    

    ngOnInit(): void {
        this._searchType = 'uploads';
    }

    private search(event: any) {
        switch (this._searchType) {
            case 'uploads': 

            break;

            case 'members': 
            break;
        }
    }
}