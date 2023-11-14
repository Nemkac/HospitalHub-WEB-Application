import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfile } from 'src/assets/user-profile';
import { UserProfileToUpdate } from 'src/assets/user-profile-to-update';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
})
export class UpdateUserProfileComponent implements OnInit{
  userId! : number;
  userProfileToUpdate! : UserProfileToUpdate;
  constructor(private userProfileService:UserProfileService,
              private route : ActivatedRoute){}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if(idFromRoute != null) {
    this.userId =+ idFromRoute
    } else {
      console.error('User ID not found in the route');
    }
  }
  
  public updateUserProfile(userProfileToUpdate: NgForm):void{
    this.userProfileService.updateUserProfile(this.userId,userProfileToUpdate.value).subscribe(
      (response:UserProfileToUpdate) => {
        this.userProfileToUpdate = response;
        console.log(response);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  }
  
