import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from 'src/userDTO';
import { User } from 'src/user';


@Injectable({
    providedIn: 'root'
})
export class CompanyAdministratorService {
    private apiServerUrl = 'http://localhost:8081';

    constructor(private http: HttpClient) {
    }

    public isCompanyAdminPasswordChanged(id: number): Observable<boolean>{
        return this.http.get<boolean>(`${this.apiServerUrl}/api/companyAdmin/isCompanyAdminPasswordChanged/${id}`);
    }

    public updateCompanyAdminPassword(id: any, password: string): Observable<User> {
        return this.http.put<User>(`${this.apiServerUrl}/api/companyAdmin/changeCompanyAdminPassword/${id}`, password);
    }

    public checkCompanyAdmin(headers:HttpHeaders): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiServerUrl}/api/companyAdmin/checkCompanyAdmin`, {headers:headers});
    }
}