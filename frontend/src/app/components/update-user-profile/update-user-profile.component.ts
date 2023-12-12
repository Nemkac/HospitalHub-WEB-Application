import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfile } from 'src/app/models/user-profile';
import { UserProfileToUpdate } from 'src/app/models/user-profile-to-update';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

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

  faClose = faClose;

  constructor(private userProfileService:UserProfileService,
              private route : ActivatedRoute,
              private modalService: NgbActiveModal,
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

  public closeModal(): void {
    this.modalService.close();
  }
}
  
