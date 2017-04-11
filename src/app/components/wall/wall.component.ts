import { UploadModel } from './../../models/upload.model';
import { AuthService } from './../../services/auth.service';
import { uploadService } from './../../services/upload.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
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
    private currentWall: Observable<UploadModel[]>;
    private olderPosts: UploadModel[] = [];
    private currentUser: UserModel;
    private loadCount = 0;
    private isLoaded: Boolean;

    constructor(private loadingCtrl: LoadingController, private uploadService: uploadService, 
                private authService: AuthService) {       
    }  

    ngOnInit(): void {
        this.currentWall = this.uploadService.getWall();
        this.currentWall.subscribe(() => this.isLoaded = true);

        this.loadCount = Config.defaultNumberOfUserUploadsPerLoad;
        this.currentUser = this.authService.currentUser;
    }

    private doInfinite(infiniteScroll: any) {
    }
}