import { LiveLocation } from './../models/LiveLocation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { Message } from '@stomp/stompjs';
import { StompService } from '@stomp/ng2-stompjs';

@Injectable({
  providedIn: 'root'
})
export class RabbitmqLiveLocationService {

  private apiServerUrl = 'http://localhost:8081';
  private topic = '/topic/liveLocation';
  constructor(private http: HttpClient, private router:Router/*, private stompService: StompService*/) { }

  public sendLiveLocationMessage(liveLocation: LiveLocation) : Observable<LiveLocation> {
    return this.http.post<LiveLocation>(`${this.apiServerUrl}/api/liveLocation/publish/json`, liveLocation);
  }

  /*public getLiveLocation(): Observable<Message> {
    return this.stompService.subscribe(this.topic);
  }*/
}
