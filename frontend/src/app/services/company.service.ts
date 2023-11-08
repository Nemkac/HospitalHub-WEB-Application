import { Company } from './../../company';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private apiServerUrl = 'http://localhost:8081';

    constructor(private http: HttpClient) {}

    public getCompanies() : Observable<Company[]> {
        return this.http.get<Company[]>(`${this.apiServerUrl}/api/company/getAll`);
    }
}
