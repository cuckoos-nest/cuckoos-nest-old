import { Component, Input } from '@angular/core';

import { UserUploadModel } from '../../../models/user-upload.model';

@Component({
    selector: 'wall-card',
    templateUrl: 'wall-card.html'
})
export class WallCardComponent {

    @Input("data")
    public userUpload: UserUploadModel;

    constructor() {
    }

    private stringifyTime(dateTime: string): string {
        return "";
    }    
}