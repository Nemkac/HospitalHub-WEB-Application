import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordChangeModalComponent } from 'src/app/components/password-change-modal/password-change-modal.component';
import { SystemAdministratorService } from 'src/app/services/systemAdministrator.service';
import { CompanyAdministratorService } from 'src/app/services/companyAdministrator.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnInit {
  token = localStorage.getItem('token');
  passwordChanged: boolean = true;
  user: User | undefined;

  constructor(
    private userService: UserService,
    private systemAdministratorService: SystemAdministratorService,
    private companyAdministratorService: CompanyAdministratorService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (this.token) {
      this.userService.getUserByToken(this.token).subscribe(
        (user: User) => {
          this.user = user;
          console.log('Logged in user:', this.user);

          if (user.roles === 'ROLE_SYSADMIN') {
            this.checkAndOpenPasswordModal(
              this.systemAdministratorService,
              user.id
            );
          } else if (user.roles === 'ROLE_COMPANYADMIN') {
            this.checkAndOpenPasswordModal(
              this.companyAdministratorService,
              user.id
            );
          }
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }

  private checkAndOpenPasswordModal(
	adminService:
	  | SystemAdministratorService
	  | CompanyAdministratorService,
	userId: any
  ) {
	const isCompanyAdmin = adminService instanceof CompanyAdministratorService;
  
	const passwordChangedObservable = isCompanyAdmin
	  ? (adminService as CompanyAdministratorService).isCompanyAdminPasswordChanged(userId)
	  : (adminService as SystemAdministratorService).isPasswordChanged(userId);
  
	passwordChangedObservable.subscribe(
	  (status: boolean) => {
		this.passwordChanged = status;
		console.log('Password changed: ', this.passwordChanged);
  
		if (!this.passwordChanged) {
		  const modalRef = this.modalService.open(
			PasswordChangeModalComponent,
			{ backdrop: 'static', keyboard: false }
		  );
  
		  // Pass userId and isAdminCompany to the modal
		  modalRef.componentInstance.userId = userId;
		  modalRef.componentInstance.isAdminCompany = isCompanyAdmin;
		}
	  },
	  (error: HttpErrorResponse) => {
		alert(error.message);
	  }
	);
  }
}
