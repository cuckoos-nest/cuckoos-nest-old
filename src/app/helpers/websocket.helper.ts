import { SignalR, SignalRConnectionBase, BroadcastEventListener } from 'ng2-signalr';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class WebSocketHelper {
    private static _signalR: SignalR;
    
    constructor(signalR: SignalR) {
        WebSocketHelper._signalR = signalR;
    }

    public static listen<T>(): Observable<WebSocketResponse<T>> {
        return new Observable<WebSocketResponse<T>>((observer: Observer<WebSocketResponse<T>>) => {
            WebSocketHelper._signalR.connect().then((c: SignalRConnectionBase) => {
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