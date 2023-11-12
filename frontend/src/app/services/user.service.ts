import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LogInDTO } from "src/LogInDTO";
import { User } from "src/User";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private apiServerUrl = 'http://localhost:8081';
    
    constructor(private http: HttpClient){}

    public logIn(logInDTO: LogInDTO):Observable<LogInDTO>{      
        return this.http.post<LogInDTO>(`${this.apiServerUrl}/users/logIn`, logInDTO);
    }
    public register(userDto:User):Observable<User>{
        return this.http.post<User>(`${this.apiServerUrl}/users/register`, userDto);
    }

}