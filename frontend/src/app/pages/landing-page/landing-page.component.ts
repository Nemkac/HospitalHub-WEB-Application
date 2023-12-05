import { HttpErrorResponse } from '@angular/common/http';
import { SystemAdministratorService } from 'src/app/services/systemAdministrator.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordChangeModalComponent } from 'src/app/components/password-change-modal/password-change-modal.component';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnInit{

	token = localStorage.getItem('token');
	passwordChanged: boolean = true;
	user: User | undefined;

	constructor(private userService : UserService,
				private systemAdministratorService: SystemAdministratorService,
				private modalService: NgbModal){}

	ngOnInit(): void {
		if (this.token) {
			this.userService.getUserByToken(this.token).subscribe(
			  (user: User) => {
				this.user = user;
				console.log('Logged in user:', this.user);
				if(user.roles === "ROLE_SYSADMIN"){
					this.systemAdministratorService.isPasswordChanged(user.id).subscribe(
						(status: boolean) => {
							this.passwordChanged = status;
							console.log('Password changed: ', this.passwordChanged);
							if(this.passwordChanged === false){
								const modalRef = this.modalService.open(PasswordChangeModalComponent, { backdrop: 'static', keyboard: false });
								modalRef.componentInstance.userId = user.id;
							}
						}, (error: HttpErrorResponse) => {
							alert(error.message);
						}
					)
				}
			  },
			  (error) => {
				console.error('Error fetching user:', error);
			  }
			);
		}
	}

}
