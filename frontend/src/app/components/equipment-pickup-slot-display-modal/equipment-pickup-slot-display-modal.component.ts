import { Component, OnInit } from '@angular/core';
import { EquipmentPickupSlot } from 'src/app/models/EquipmentPickupSlot';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-equipment-pickup-slot-display-modal',
  templateUrl: './equipment-pickup-slot-display-modal.component.html',
})
export class EquipmentPickupSlotDisplayModalComponent{
  public slot : EquipmentPickupSlot | undefined;

  faClose = faClose;

  constructor(private modalService: NgbActiveModal){}

  public closeModal(): void {
    this.modalService.close();
  }
}
