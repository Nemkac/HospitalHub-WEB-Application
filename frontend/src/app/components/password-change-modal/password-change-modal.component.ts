import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-password-change-modal',
  templateUrl: './password-change-modal.component.html',
})
export class PasswordChangeModalComponent {
  @Input() userId: number | undefined;

  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close();
  }
}
