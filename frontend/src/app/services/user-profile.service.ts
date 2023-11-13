import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserProfile } from "src/assets/user-profile";


@Injectable(
    {
        providedIn:'root'
    }
)
export class UserProfileService{
    private apiServerUrl = 'http://localhost:8081';

    constructor(private http: HttpClient) {}

    public showUserProfile(id : number) : Observable<UserProfile> { 
        return this.http.get<UserProfile>(`${this.apiServerUrl}/api/user/profile/${id}`)
    }

}