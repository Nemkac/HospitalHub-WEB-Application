import { Company } from './../../company';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    public createCompany(company: Company) : Observable<Company> {
        return this.http.post<Company>(`${this.apiServerUrl}/api/company/save`, company);
    }

    public updateCompany(company: Company, id : number): Observable<Company> {
        console.log("Update Company: ", company); 
        return this.http.put<Company>(`${this.apiServerUrl}/api/company/update/${id}`, company);
    }

    public getAdminsCompany(): Observable<Company> {
        return this.http.get<Company>(`${this.apiServerUrl}/api/company/getAdminsCompany`);
    }

    public showCompanies(name?:string,country?:string,city?:string,avgRate?:number):Observable<Company[]>{
        let params = new HttpParams();
        if (name) params = params.set('name',name);
        if (country) params = params.set('country',country);
        if (city) params = params.set('city',city);
        if (avgRate) params = params.set('avgRate',avgRate.toString());

        return this.http.get<Company[]>(`${this.apiServerUrl}/api/user/companies`,{params})
    }
}
