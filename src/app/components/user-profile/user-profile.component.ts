import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { UserModel } from '../../models/user.model';

import { UsersService } from '../../services/users.service';

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.html'
})
export class UserProfileComponent {

    private _user: UserModel;
    private _isMyProfile: Boolean;

    constructor(private navParams: NavParams, private usersService: UsersService) {
        this._user = navParams.get('user');

        if (navParams.get('user')) {
            this._user = navParams.get('user');
        }
        else {
            this._user = this.usersService.loggedInUser;
        }

        
        this._isMyProfile = (this._user.id == this.usersService.loggedInUser.id);
        console.log((this._user.id == this.usersService.loggedInUser.id));
    }    
}