import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Company } from "src/company";



@Injectable(
    {
        providedIn:'root'
    }
)
export class ShowCompaniesService{

    private apiServerUrl = 'http://localhost:8081';
    
    constructor(private http : HttpClient){}

    public showCompanies():Observable<Company[]>{
        return this.http.get<Company[]>(`${this.apiServerUrl}/api/company/getAll`)
    }
}