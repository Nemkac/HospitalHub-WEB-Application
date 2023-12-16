import { Company } from './../../company';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { id } from 'date-fns/locale';
import { Observable } from 'rxjs'
import { Router } from '@angular/router';
import { EquipmentPickupSlot } from '../models/EquipmentPickupSlot';
import { User } from 'src/user';
import { CompanyDTO } from '../copmanyDTO';


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

    public updateCompany(companyDTO: CompanyDTO, userId: number): Observable<CompanyDTO> {
        return this.http.put<CompanyDTO>(`${this.apiServerUrl}/api/company/update/${userId}`, companyDTO);
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

    public getCompanysFreeAppointments(companyId : number) : Observable<EquipmentPickupSlot[]>{
        return this.http.get<EquipmentPickupSlot[]>(`${this.apiServerUrl}/api/company/getAllFreeAppointments/${companyId}`);
    }

    public getCompanysAllAppointments(companyId : number) : Observable<EquipmentPickupSlot[]>{
        return this.http.get<EquipmentPickupSlot[]>(`${this.apiServerUrl}/api/company/getAllAppointments/${companyId}`);
    }

    public getCompanyAdministrators(companyId : number) : Observable<User[]>{
        return this.http.get<User[]>(`${this.apiServerUrl}/api/company/getAdministrators/${companyId}`);
    }
}
