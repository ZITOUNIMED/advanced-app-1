import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from "rxjs";

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/greetings";
    stompClient: any;
    notifier: BehaviorSubject<string>;

    constructor(notifier: BehaviorSubject<string>) {
        this.notifier = notifier;
    }

    connect(): void {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({}, (frame: any) => {
            this.stompClient.subscribe(this.topic, (sdkEvent: any) => {
                this.onMessageReceived(sdkEvent);
            });
        }, this.errorCallBack);
    }

    onMessageReceived(message: any): void {
        console.log("Message Recieved from Server :: " + message);
        this.notifier?.next(JSON.parse(message.body).content);
    }

    errorCallBack(error: any): void {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this.connect();
        }, 5000);
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    send(message: {name: string}) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }
}