import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from 'src/userDTO';


@Injectable({
    providedIn: 'root'
})
export class SystemAdministratorService {
    private apiServerUrl = 'http://localhost:8081';

    constructor(private http: HttpClient) {}

    public createCompanyAdministrator(userDTO : UserDTO) : Observable<UserDTO> {
        return this.http.put<UserDTO>(`${this.apiServerUrl}/api/profile/newCompanyAdmin`, userDTO);
    }
}