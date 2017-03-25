import { AngularFire } from 'angularfire2';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './../models/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
    constructor(private af: AngularFire, private authService: AuthService) {
    }
    
    public getUser(uid: string): Observable<UserModel> {
        return this.af.database.object("/users/" + uid);
    }

    public getUsersImFollowing(uid: string): Observable<string[]> {
        return this.af.database.list(`/user-followers/following/${this.authService.currentUser.$key}`)
        .map(refArr => refArr.map(ref => ref.$key));
    }

    public follow(uid: string): void {
        this.af.database.object(`/user-followers/followers/${uid}/${this.authService.currentUser.$key}`).set(true);
        this.af.database.object(`/user-followers/following/${this.authService.currentUser.$key}/${uid}`).set(true);
    }

    public unfollow(uid: string): void {
        this.af.database.object(`/user-followers/followers/${uid}/${this.authService.currentUser.$key}`).set(null);
        this.af.database.object(`/user-followers/following/${this.authService.currentUser.$key}/${uid}`).set(null);
    }
}