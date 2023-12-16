import { Company } from './../../company';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { id } from 'date-fns/locale';
import { Observable } from 'rxjs'
import { Router } from '@angular/router';
import { EquipmentPickupSlot } from '../models/EquipmentPickupSlot';

@Injectable({
    providedIn: 'root'
})

export class CompanyService {
    private apiServerUrl = 'http://localhost:8081';

    constructor(private http: HttpClient,private router:Router) {}

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

    public getAdminsCompany(userId: number): Observable<Company> {
        return this.http.get<Company>(`${this.apiServerUrl}/api/company/getAdminsCompany/${userId}`);
    }

    public getCompany(id : number) : Observable<Company> {
        return this.http.get<Company>(`${this.apiServerUrl}/api/company/${id}`);
    }
    
    public goToCompany(id:number):void {
        this.router.navigate([`/company/${id}`]);
    }

    public showCompanies(name?:string,country?:string,city?:string,avgRate?:number):Observable<Company[]>{
        let params = new HttpParams();
        if (name) params = params.set('name',name);
        if (country) params = params.set('country',country);
        if (city) params = params.set('city',city);
        if (avgRate) params = params.set('avgRate',avgRate.toString());

        return this.http.get<Company[]>(`${this.apiServerUrl}/api/user/companies`,{params})
    }

    public getCompanysSlots(id : number): Observable<EquipmentPickupSlot[]>{
        return this.http.get<EquipmentPickupSlot[]>(`${this.apiServerUrl}/api/company/getPredefinedSlots/${id}`);
    }

    public occupySlot(slot:EquipmentPickupSlot, userId:number) : Observable<EquipmentPickupSlot>{
        return this.http.put<EquipmentPickupSlot>(`${this.apiServerUrl}/api/slots/occupyPredifinedSlot/${userId}`,slot);
    }
}
