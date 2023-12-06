import { UserDTO } from './../../userDTO'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogInDTO } from "src/LogInDTO";
import { catchError, map ,tap} from 'rxjs/operators';
import { User } from "src/user";

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

    
    private _loggedInUser?: String = "LOGIN";

    get loggedInUser(): String {
        return this._loggedInUser as String;
    }
    set loggedInUser(user: String) {
        this._loggedInUser = user;
    }
  
    public logIn(logInDTO: LogInDTO):Observable<LogInDTO>{      
        return this.http.post<LogInDTO>(`${this.apiServerUrl}/logIn`, logInDTO).pipe(
          tap((response:LogInDTO)=>{
              localStorage.setItem('token', response.email);
        })
    )}

    public register(userDto:User):Observable<User>{
        return this.http.post<User>(`${this.apiServerUrl}/register`, userDto);
    }

    public getUserByToken(token: string): Observable<User> {
        return this.http.get<User>(`${this.apiServerUrl}/api/user/getUserByToken/${token}`);
    }
}
