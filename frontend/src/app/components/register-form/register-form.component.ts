import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/user';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/userDTO';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {

  constructor(private userService: UserService){}

  ngOnInit(): void {}

  public register(RegisterForm : NgForm):void{
    this.userService.register(RegisterForm.value).subscribe(
      (response: UserDTO) => {
        console.log(response);          
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


}
