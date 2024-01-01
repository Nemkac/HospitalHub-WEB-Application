import { Component, OnInit } from '@angular/core';
import { EquipmentPickupSlot } from 'src/app/models/EquipmentPickupSlot';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipmentPickupSlotService } from 'src/app/services/equipment-pickup-slot.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-equipment-pickup-slot-display-modal',
  templateUrl: './equipment-pickup-slot-display-modal.component.html',
})
export class EquipmentPickupSlotDisplayModalComponent{
  public slot: EquipmentPickupSlot | undefined;

  faClose = faClose;

  constructor(private modalService: NgbActiveModal,
    private equipmentPickupSlotService: EquipmentPickupSlotService
    ){}

  public closeModal(): void {
    this.modalService.close();
  }
  markEquipmentAsPickedUp(slotId: number| undefined): void {
    this.equipmentPickupSlotService.markEquipmentPickedUp(slotId!).subscribe(
      () => {
        console.log('Equipment marked as picked up successfully.');
        // Dodajte dodatnu logiku po potrebi
      },
      (error) => {
        console.error('Failed to mark equipment as picked up:', error);
        // Obradite grešku po potrebi
      }
    );
  }
}


