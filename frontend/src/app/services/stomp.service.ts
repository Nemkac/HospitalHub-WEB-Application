import { Injectable } from "@angular/core";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
    providedIn: 'root'
})
export class StompService {
    socket = new SockJS('http://localhost:8081/livelocation-websocket');
    stompClient = Stomp.over(this.socket);

    public subscribe(topic: string, callback: any) : void {
        const connected: boolean = this.stompClient.connected;

        if(connected) { 
            this.subscribeToTopic(topic, callback);
            return;
        }

        this.stompClient.connect({}, (): any => {
            this.subscribeToTopic(topic, callback);
        })
    }

    private subscribeToTopic(topic: string, callback: any) : void{
        this.stompClient.subscribe(topic, (): any => {
            callback();
        })
    }
}