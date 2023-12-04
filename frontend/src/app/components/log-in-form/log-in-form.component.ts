import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LogInDTO } from 'src/LogInDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html'
})
export class LogInFormComponent implements OnInit {

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {}

  public logIn(LogInForm:NgForm):void{
    this.userService.logIn(LogInForm.value).subscribe(
      (response: LogInDTO) => {
        this.userService.loggedInUser = LogInForm.value.email;
        console.log(response);          
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }
}
