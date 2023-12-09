import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/user';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SystemAdministratorService } from 'src/app/services/systemAdministrator.service';
import { CompanyAdministratorService } from 'src/app/services/companyAdministrator.service';

@Component({
  selector: 'app-password-change-modal',
  templateUrl: './password-change-modal.component.html',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      transition('void <=> *', animate('0.4s ease-in-out')),
    ])
  ]
})
export class PasswordChangeModalComponent {
  @Input() userId: any;
  @Input() isAdminCompany: boolean = false;

  newPassword: string = '';
  repeatPassword: string = '';
  passwordMismatch: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private systemAdministratorService: SystemAdministratorService,
    private companyAdministratorService: CompanyAdministratorService
  ) {}

  changePassword() {
    if (this.newPassword === this.repeatPassword) {
      if (this.isAdminCompany) {
        // Handle company admin logic
        this.companyAdministratorService.updateCompanyAdminPassword(this.userId, this.newPassword).subscribe(
          (user: User) => {
            console.log('Password changed successfully:', user);
            this.activeModal.close();
          },
          (error) => {
            console.error('Error changing password:', error);
          }
        );
      } else {
        this.systemAdministratorService.updatePassword(this.userId, this.newPassword).subscribe(
          (user: User) => {
            console.log('Password changed successfully:', user);
            this.activeModal.close();
          },
          (error) => {
            console.error('Error changing password:', error);
          }
        );
      }
    } else {
      this.passwordMismatch = true;
    }
  }
}
