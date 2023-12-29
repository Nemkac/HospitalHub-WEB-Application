import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LogInDTO } from 'src/LogInDTO';
import { Router } from '@angular/router';
import { User } from 'src/user';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html'
})
export class LogInFormComponent implements OnInit {
  
  constructor(private userService: UserService, private router: Router, private toast: NgToastService){}

  ngOnInit(): void {}

  public async logIn(LogInForm:NgForm):Promise<void>{
    const response: LogInDTO | undefined = await this.userService.logIn(LogInForm.value).toPromise();
    let userResponse: User | undefined;
    if(response){
      userResponse= await this.userService.getUserByToken(response.email).toPromise();
    } else {
      this.toast.error({detail:"Login failed", summary:"Email or password is incorrect"});
    }
    let service = this.userService;
    if(userResponse){
      service.loggedInUser = userResponse.username;
      service.loggedInUserId = userResponse.id;
      service.loggedInUserRole = userResponse.roles;
    }

    console.log(service.loggedInUser);
    this.router.navigate(['/']);
  } 
}
