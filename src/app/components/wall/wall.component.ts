import { UserUploadModel } from './../../models/user-upload.model';
import { AuthService } from './../../services/auth.service';
import { UserUploadService } from './../../services/user-upload.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { UsersService } from '../../services/users.service';
import { WallService } from '../../services/wall.service';
import { WebSocketResponse, WebSocketResponseType } from '../../services/websocket.service';

import Config from '../../config.json';
import { UserModel } from "../../models/user.model";
import { Subject } from "rxjs/Subject";

@Component({
    selector: 'wall',
    templateUrl: 'wall.html'
})
export class WallComponent implements OnInit {
    private _currentWall: Observable<UserUploadModel[]>;
    private _olderPosts = new Array<UserUploadModel>();
    private _currentUser: UserModel;
    private _loadCount = 0;
    private _isLoaded: Boolean;

    constructor(private loadingCtrl: LoadingController, private userUploadService: UserUploadService, private authService: AuthService) {       
    }  

    ngOnInit(): void {
        this._currentWall = this.userUploadService.getWall();
        this._currentWall.subscribe(() => this._isLoaded = true);

        this._loadCount = Config.defaultNumberOfUserUploadsPerLoad;
        this._currentUser = this.authService.currentUser;
    }

    private doInfinite(infiniteScroll: any) {
    }
}