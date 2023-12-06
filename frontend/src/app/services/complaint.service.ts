import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Complaint } from '../models/Complaint';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiServerUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  public getAllComplaints() : Observable<Complaint[]>{
    return this.http.get<Complaint[]>(`${this.apiServerUrl}/api/complaints/getAll`);
  }
}
