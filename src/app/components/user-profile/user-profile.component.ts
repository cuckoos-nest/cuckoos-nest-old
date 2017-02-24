import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { UserModel } from '../../models/user.model';

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.html'
})
export class UserProfileComponent {

    private user: UserModel;

    constructor(private navParams: NavParams) {
        this.user = navParams.get('user');
    }    
}