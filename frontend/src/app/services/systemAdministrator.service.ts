import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from 'src/userDTO';
import { User } from 'src/user';


@Injectable({
    providedIn: 'root'
})
export class SystemAdministratorService {
    private apiServerUrl = 'http://localhost:8081';

    constructor(private http: HttpClient) {}

    public createCompanyAdministrator(userDTO : UserDTO) : Observable<UserDTO> {
        return this.http.put<UserDTO>(`${this.apiServerUrl}/api/profile/newCompanyAdmin`, userDTO);
    }

    public createSystemAdministrator(userDTO : UserDTO) : Observable<UserDTO> {
        return this.http.put<UserDTO>(`${this.apiServerUrl}/api/profile/newSysAdmin`, userDTO);
    }

    public isPasswordChanged(id: number): Observable<boolean>{
        return this.http.get<boolean>(`${this.apiServerUrl}/api/profile/isPasswordChanged/${id}`);
    }

    public updatePassword(id: any, password: string): Observable<User> {
        return this.http.put<User>(`${this.apiServerUrl}/api/profile/changePassword/${id}`, password);
    }
}