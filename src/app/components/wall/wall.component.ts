import { Component } from '@angular/core';

import { UserUploadModel } from '../../models/user-upload.model';
import { UserModel } from '../../models/user.model';

import { UsersService } from '../../services/users.service';
import { WallService } from '../../services/wall.service';

@Component({
    selector: 'wall',
    templateUrl: 'wall.html'
})
export class WallComponent {

    private _loggedInUser: UserModel;
    private _currentWall: UserUploadModel[];

    constructor(private usersService: UsersService, private wallService: WallService) {
        this._loggedInUser = this.usersService.loggedInUser;
        
        this.wallService.getWallByUser(this._loggedInUser.id)
            .subscribe(wall => this._currentWall = wall);
    }  
}