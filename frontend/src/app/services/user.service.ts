import { UserDTO } from './../../userDTO'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  public updateCompanyAdministrator(userDTO: UserDTO, id : number): Observable<UserDTO> {
      console.log("Update Company Administrator: ", userDTO);  
      return this.http.put<UserDTO>(`${this.apiServerUrl}/api/user/update/${id}`, userDTO);
  }
}
