import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfile } from 'src/app/models/user-profile';
import { UserProfileToUpdate } from 'src/app/models/user-profile-to-update';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
})
export class UpdateUserProfileComponent implements OnInit{
  userId! : number;
  userProfileToUpdate! : UserProfileToUpdate;
  userInfo! : Observable<UserProfile>;
  user! : UserProfile;
  date = new FormControl(new Date());
  usersBirthDate = "";
  constructor(private userProfileService:UserProfileService,
              private route : ActivatedRoute){}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if(idFromRoute != null) {
    this.userId =+ idFromRoute
    } else {
      console.error('User ID not found in the route');
    }
    this.userInfo = this.userProfileService.showUserProfile(this.userId);
    this.userInfo.subscribe(
      (user:UserProfile) =>{
        this.user = user;
        this.usersBirthDate = user.dateOfBirth.toString();
      }
    )
  }
  
  public updateUserProfile(userProfileToUpdate: NgForm):void{
    this.userProfileService.updateUserProfile(this.userId,userProfileToUpdate.value).subscribe(
      (response:UserProfileToUpdate) => {
        this.userProfileToUpdate = response;
        window.location.reload();
        console.log(response);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getPasswordPlaceholder():string{
    const passwordLength = this.user.password.length;
    return '*'.repeat(passwordLength);
  }


  }
  
