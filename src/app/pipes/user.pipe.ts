import { Observable } from 'rxjs/Observable';
import { UsersService } from './../services/users.service';
import { UserModel } from './../models/user.model';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'user',
  pure: false
})
export class UserPipe implements PipeTransform {
    private _cachedUid: string;
    private _cachedUser: UserModel;

    private static _globalUsersCache = new Array<UserModel>();

    constructor(private usersService: UsersService) {
    }

    transform(value: string): UserModel {
        if (value != this._cachedUid) {
            this._cachedUid = value;
            this._cachedUser = UserPipe._globalUsersCache.find(user => user.$key == value);
            
            if (!this._cachedUser) {
                let sub = this.usersService.getUser(value).subscribe(user => {
                    this._cachedUser = user;
                    UserPipe._globalUsersCache.push(user);
                });

                sub.unsubscribe();
            }
        }
        return this._cachedUser;
    }
}