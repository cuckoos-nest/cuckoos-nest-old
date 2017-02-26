import { Component } from '@angular/core';

import { UserUploadModel } from '../../models/user-upload.model';
import { UserModel } from '../../models/user.model';

import { UsersService } from '../../services/users.service';

@Component({
    selector: '<wall></wall>',
    templateUrl: 'wall.html'
})
export class WallComponent {

    private _loggedInUser: UserModel;
    private _currentWall: UserUploadModel[];

    constructor(private usersService: UsersService) {
        this._loggedInUser = this.usersService.loggedInUser;
    }    
}