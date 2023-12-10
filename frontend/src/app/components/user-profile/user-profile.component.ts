import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfile } from 'src/assets/user-profile';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit{
  userId! : number;
  userProfile!: UserProfile;
  token = localStorage.getItem('token');
  user !: User ;
  constructor(private userProfileService:UserProfileService,
              private route: ActivatedRoute,
              private userService:UserService){}

  ngOnInit(): void {
    //const idFromRoute = this.route.snapshot.paramMap.get('id');
    //if(idFromRoute != null) {
    //this.userId =+ idFromRoute
    this.showUserProfile();
   // } else {
    //  console.error('User ID not found in the route');
    //}
  }

  public showUserProfile1():void{
    this.userProfileService.showUserProfile(this.userId).subscribe(
      (response:UserProfile) => {
        this.userProfile = response;
        console.log(this.userProfile);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public showUserProfile():void{
    if(this.token) {
      this.userService.getUserByToken(this.token).subscribe(
        (user) => {
          this.user = user;
          this.userProfileService.showUserProfile(user.id).subscribe(
            (response:UserProfile) => {
              this.userProfile = response;
              console.log(this.userProfile);
            }
          )       
        }
      )
    }
  }

  public goToUpdate():void{
    this.userProfileService.goToUpdateProfile(this.user.id);
  }

}
