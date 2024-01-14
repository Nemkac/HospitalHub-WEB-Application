import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestDeliveryService {

  private apiServerUrl = 'http://localhost:8081';
  constructor(private http: HttpClient, private router:Router) { }

  public goToRequestDelivery(id:number):void {
    this.router.navigate([`/request-delivery/${id}`]);
  }
}
