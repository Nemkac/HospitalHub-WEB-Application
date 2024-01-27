import { LiveLocation } from './../models/LiveLocation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RabbitmqLiveLocationService {

  private apiServerUrl = 'http://localhost:8081';
  constructor(private http: HttpClient, private router:Router) { }

  public sendLiveLocationMessage(liveLocation: LiveLocation,headers:HttpHeaders) : Observable<LiveLocation> {

    return this.http.post<LiveLocation>(`${this.apiServerUrl}/api/liveLocation/publish/json`, liveLocation,{headers:headers});
    
  }
}
