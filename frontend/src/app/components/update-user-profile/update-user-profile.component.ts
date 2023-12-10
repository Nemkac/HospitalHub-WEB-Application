import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserService } from 'src/app/services/user.service';
import { UserProfile } from 'src/assets/user-profile';
import { UserProfileToUpdate } from 'src/assets/user-profile-to-update';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
})
export class UpdateUserProfileComponent implements OnInit{
  userId! : number;
  userProfileToUpdate! : UserProfileToUpdate;
  userInfo! : Observable<UserProfile>;
  user! : UserProfile;
  token = localStorage.getItem('token');
  date = new FormControl(new Date());
  usersBirthDate = "";
  constructor(private userProfileService:UserProfileService,
              private route : ActivatedRoute,
              private userService : UserService){}

  ngOnInit(): void {
    if(this.token){
      this.userService.getUserByToken(this.token).subscribe(
        (user1) => {
    this.userInfo = this.userProfileService.showUserProfile(user1.id);
    this.userInfo.subscribe(
      (user:UserProfile) =>{
        this.user = user;
        this.usersBirthDate = user.dateOfBirth.toString();
      }
    )}
    )}
  }
  
  public updateUserProfile(userProfileToUpdate: NgForm):void{
    if(this.token) {
    this.userService.getUserByToken(this.token).subscribe(
      (user) => {
        this.userProfileService.updateUserProfile(user.id,userProfileToUpdate.value).subscribe(
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
    )
    }
  }

  public getPasswordPlaceholder():string{
    const passwordLength = this.user.password.length;
    return '*'.repeat(passwordLength);
  }


  }
  
