import { HttpClient, HttpParams } from "@angular/common/http";
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

    public showCompanies(name?:string,country?:string,city?:string,avgRate?:number):Observable<Company[]>{
        let params = new HttpParams();
        if (name) params = params.set('name',name);
        if (country) params = params.set('country',country);
        if (city) params = params.set('city',city);
        if (avgRate) params = params.set('avgRate',avgRate.toString());

        return this.http.get<Company[]>(`${this.apiServerUrl}/api/user/companies`,{params})
    }
}