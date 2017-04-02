import { Observable } from 'rxjs/Observable';
import { UsersService } from './../services/users.service';
import { UserModel } from './../models/user.model';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'user',
  pure: true
})
export class UserPipe implements PipeTransform {
    private _cachedUid: string;
    private _cachedUser: Observable<UserModel>;

    constructor(private usersService: UsersService) {
    }

    transform(value: string): Observable<UserModel> {
        if (value != this._cachedUid) {
            this._cachedUid = value;
            this._cachedUser = this.usersService.getUser(value);
        }

        return this._cachedUser;
    }
}