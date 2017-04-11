import { Observable } from 'rxjs/Observable';
import { UserModel } from './../../models/user.model';
import { ViewController, NavParams } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'users-list',
    templateUrl: 'users-list.html',
})
export class UsersListComponent {

    @Input() title: string;
    
    @Input() users: Observable<UserModel[]> | UserModel[];

    private isLoaded: Boolean;

    get isAsync(): Boolean {
        return this.users instanceof Observable;
    }

    constructor(public viewCtrl: ViewController, private navParams: NavParams) {
        this.users = this.navParams.get('users');
        this.title = this.navParams.get('title');

        if (this.isAsync) {
            (<Observable<UserModel[]>>this.users).subscribe(() => this.isLoaded = true);
        }
        else {
            this.isLoaded = true;
        }
    }

    private dismiss() {
        this.viewCtrl.dismiss();
    }
}