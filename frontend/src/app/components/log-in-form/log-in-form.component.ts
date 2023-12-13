import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LogInDTO } from 'src/LogInDTO';
import { Router } from '@angular/router';
import { User } from 'src/user';
@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html'
})
export class LogInFormComponent implements OnInit {
  
  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {}

  public async logIn(LogInForm:NgForm):Promise<void>{
    const response: LogInDTO | undefined = await this.userService.logIn(LogInForm.value).toPromise();
    let userResponse: User | undefined;
    if(response){
      userResponse= await this.userService.getUserByToken(response.email).toPromise();
    }
    let service = this.userService;
    if(userResponse){
    
    service.loggedInUser = userResponse.username;
    service.loggedInUserId = userResponse.id;
    service.loggedInUserRole = userResponse.roles;
    }
      // Now you can use the updated value outside the function
    console.log(service.loggedInUser);
  
      // Continue with other operations
    this.router.navigate(['/']);
    } 
}
