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
    private _currentWall: UserUploadModel[] = new Array<UserUploadModel>();

    constructor(private usersService: UsersService, private wallService: WallService) {
        this._loggedInUser = this.usersService.loggedInUser;
        
        this.wallService.getWallListener()
            .subscribe(userUpload => {
                this._currentWall.push(userUpload);
                this._currentWall = this._currentWall.sort((a: UserUploadModel, b: UserUploadModel) => {
                    if (a.id < b.id) {
                        return 1; 
                    }
                    if (b.id > a.id) {
                        return -1;
                    }

                    return 0;
                });
            });
    }  
}