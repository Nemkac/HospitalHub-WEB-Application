import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LogInDTO } from "src/LogInDTO";
import { User } from "src/User";
import { catchError, map ,tap} from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class UserService{
    private apiServerUrl = 'http://localhost:8081';

    private _loggedInUser?: String = "Log in";

    get loggedInUser(): String {
        return this._loggedInUser as String;
    }
    set loggedInUser(user: String) {
        this._loggedInUser = user;
    }

    constructor(private http: HttpClient){}
    
    public logIn(logInDTO: LogInDTO):Observable<LogInDTO>{      
        return this.http.post<LogInDTO>(`${this.apiServerUrl}/logIn`, logInDTO).pipe(
            tap((response:LogInDTO)=>{
                localStorage.setItem('token', response.email);
            }
            )
        )
    }
   
    public register(userDto:User):Observable<User>{
        return this.http.post<User>(`${this.apiServerUrl}/register`, userDto);
    }

}