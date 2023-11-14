import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserProfile } from "src/assets/user-profile";
import { UserProfileToUpdate } from "src/assets/user-profile-to-update";


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

    public updateUserProfile(id:number, userProfileToUpdate:UserProfileToUpdate) : Observable<UserProfileToUpdate>{
        return this.http.put<UserProfileToUpdate>(`${this.apiServerUrl}/api/user/updateProfile/${id}`, userProfileToUpdate)
    }

}