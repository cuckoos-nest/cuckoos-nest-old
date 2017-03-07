import { Injectable } from '@angular/core';
import { SignalR, SignalRConnectionBase, BroadcastEventListener } from 'ng2-signalr';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { BaseService } from './base/base.service';

@Injectable()
export class WebSocketService extends BaseService {
    private static _signalR: SignalR;
    
    constructor(private _signalR: SignalR) {
        super(); 
    }

    public listen<T>(): Observable<WebSocketResponse<T>> { 
        return new Observable<WebSocketResponse<T>>((observer: Observer<WebSocketResponse<T>>) => {
            this._signalR.connect().then((c: SignalRConnectionBase) => {
                let listener: BroadcastEventListener<WebSocketResponse<T>> = new BroadcastEventListener<WebSocketResponse<T>>("onResponse");
                c.listen(listener);
                listener.subscribe((response: WebSocketResponse<T>) => {
                    observer.next(response);
                });
            });
        });
    }
}

export class WebSocketResponse<T> {
    public Entity: T;
    public ResponseType: WebSocketResponseType;
}

export enum WebSocketResponseType {
    Add,
    Delete,
    Modify
}