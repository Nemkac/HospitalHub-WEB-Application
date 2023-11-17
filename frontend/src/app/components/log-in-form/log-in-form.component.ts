import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LogInDTO } from 'src/LogInDTO';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html'
})
export class LogInFormComponent implements OnInit {

    constructor(private userService: UserService){}

    ngOnInit(): void {}

    public logIn(LogInForm:NgForm):void{
      this.userService.logIn(LogInForm.value).subscribe(
        (response: LogInDTO) => {
          this.userService.loggedInUser = LogInForm.value.email;
          console.log(response);          
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )


    }

}
