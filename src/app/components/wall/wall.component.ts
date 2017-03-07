import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';


import { UserUploadModel } from '../../models/user-upload.model';
import { UserModel } from '../../models/user.model';

import { UsersService } from '../../services/users.service';
import { WallService } from '../../services/wall.service';
import { WebSocketResponse, WebSocketResponseType } from '../../services/websocket.service';

import Config from '../../config.json';

@Component({
    selector: 'wall',
    templateUrl: 'wall.html'
})
export class WallComponent {

    private _loggedInUser: UserModel;
    private _currentWall: UserUploadModel[] = new Array<UserUploadModel>();

    constructor(private usersService: UsersService, private wallService: WallService, private loadingCtrl: LoadingController) {
        this._loggedInUser = this.usersService.loggedInUser;
        
        let loader = this.loadingCtrl.create({
            content: `Loading wall...`
        });
        loader.present();

        // Load the first wall items
        this.wallService.getWallItems(this._currentWall.length, Config.defaultNumberOfUserUploadsPerLoad).subscribe((userUploads: UserUploadModel[]) => {
            this._currentWall = userUploads;
            loader.dismiss();
        });

        // Listen for changes in the wall server
        this.wallService.getWallListener()
            .subscribe(response => {
                if (response.ResponseType == WebSocketResponseType.Add) {
                    this._currentWall.unshift(response.Entity);
                }
                else if (response.ResponseType == WebSocketResponseType.Modify) {
                    let userUploadIndex: number = 
                            this._currentWall.findIndex((userUpload: UserUploadModel) => userUpload.id == response.Entity.id);

                    if (userUploadIndex != -1) {
                        this._currentWall[userUploadIndex] = response.Entity; 
                    }
                }
                else if (response.ResponseType == WebSocketResponseType.Delete) {
                    let userUploadIndex: number = 
                            this._currentWall.findIndex((userUpload: UserUploadModel) => userUpload.id == response.Entity.id);

                    this._currentWall = this._currentWall.splice(userUploadIndex, 1);
                }
            });
    }  

    private doInfinite(infiniteScroll: any) {
        if (Config.debugMode) {
            console.log("Loading more wall items");
        }

        this.wallService.getWallItems(this._currentWall.length, Config.defaultNumberOfUserUploadsPerLoad).subscribe((userUploads: UserUploadModel[]) => {
            userUploads.forEach(userUpload => this._currentWall.push(userUpload));
            infiniteScroll.complete();

            if (Config.debugMode) {
                console.log("Wall loading completed");
            }
        });
    }
}