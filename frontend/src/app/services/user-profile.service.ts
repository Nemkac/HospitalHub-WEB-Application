import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserProfile } from "src/app/models/user-profile";
import { UserProfileToUpdate } from "src/app/models/user-profile-to-update";
import { Router } from "@angular/router";


@Injectable(
    {
        providedIn:'root'
    }
)
export class UserProfileService{
    private apiServerUrl = 'http://localhost:8081';

    constructor(private http: HttpClient,private router:Router) {}

    public showUserProfile(id : number) : Observable<UserProfile> { 
        return this.http.get<UserProfile>(`${this.apiServerUrl}/api/user/profile/${id}`)
    }

    public updateUserProfile(id:number, userProfileToUpdate:UserProfileToUpdate) : Observable<UserProfileToUpdate>{
        return this.http.put<UserProfileToUpdate>(`${this.apiServerUrl}/api/user/updateProfile/${id}`, userProfileToUpdate)
    }

    public goToUpdateProfile(id:number):void {
        this.router.navigate([`/api/user/updateProfile/${id}`]);
    }

}