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

  public getAllProcessedComplaints() : Observable<Complaint[]>{
    return this.http.get<Complaint[]>(`${this.apiServerUrl}/api/complaints/getProcessed`)
  }

  public getAllUnprocessedComplaints() : Observable<Complaint[]>{
    return this.http.get<Complaint[]>(`${this.apiServerUrl}/api/complaints/getUnprocessed`);
  }

  public getComplaintById(id: number): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.apiServerUrl}/api/complaints/getComplaintById/${id}`);
  }
}
