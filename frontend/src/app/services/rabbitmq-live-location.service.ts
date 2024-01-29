import { LiveLocation } from './../models/LiveLocation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RxStomp } from '@stomp/rx-stomp';
import { Observable, catchError, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class RabbitmqLiveLocationService {

  private apiServerUrl = 'http://localhost:8081';
  //private socket$: WebSocketSubject<LiveLocation>;

  constructor(private http: HttpClient, private router:Router) { 
    //this.socket$ = webSocket('ws://localhost:15672/ws');
    
  }

  public sendLiveLocationMessage(liveLocation: LiveLocation) : Observable<LiveLocation> {
    return this.http.post<LiveLocation>(`${this.apiServerUrl}/api/liveLocation/publish/json`, liveLocation);
  }

  /*public receiveLiveLocationMessages(): Observable<LiveLocation> {
    return this.socket$.asObservable();
  }*/
}
