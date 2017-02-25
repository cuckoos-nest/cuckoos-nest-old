import { Component } from '@angular/core';

import { UserUploadModel } from '../../models/user-upload.model';

@Component({
    selector: '<wall></wall>',
    templateUrl: 'wall.html'
})
export class WallComponent {

    private _currentWall: UserUploadModel[];

    constructor() {
        
    }    
}