import { SystemAdministratorService } from 'src/app/services/systemAdministrator.service';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/user';
import { animate, state, style, transition, trigger } from '@angular/animations';

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

  newPassword: string = '';
  repeatPassword: string = '';
  passwordMismatch: boolean = false;

  constructor(public activeModal: NgbActiveModal,
              private systemAdministratorService: SystemAdministratorService) {}

  changePassword() {
    if (this.newPassword === this.repeatPassword) {
      this.systemAdministratorService.updatePassword(this.userId, this.newPassword).subscribe(
        (user: User) => {
          console.log('Password changed successfully:', user);
          this.activeModal.close();
        },
        (error) => {
          console.error('Error changing password:', error);
        }
      );
    } else {
      this.passwordMismatch = true;
    }
  }
}
