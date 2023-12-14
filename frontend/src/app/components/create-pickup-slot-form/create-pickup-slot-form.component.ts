import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { EquipmentPickupSlot } from 'src/app/models/EquipmentPickupSlot';
import { EquipmentPickupSlotService } from 'src/app/services/equipment-pickup-slot.service';

@Component({
  selector: 'app-create-pickup-slot-form',
  templateUrl: './create-pickup-slot-form.component.html',
  styleUrls: ['./create-pickup-slot-form.component.css']
})
export class CreatePickupSlotFormComponent {
  @Input() userId!: number;  
  modalService: any;
  faClose! : typeof faClose;


  constructor(private equipmentPickupSlotService: EquipmentPickupSlotService) {}

  createNewSlot(form: NgForm): void {
    if (form.valid) {
    const pickupSlotData = form.value;
    

    this.equipmentPickupSlotService.addNewSlot(pickupSlotData, this.userId).subscribe(
      (savedPickupSlot) => {
        window.location.reload();
        console.log(savedPickupSlot);
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
    }
    else {
      alert('Error!');
  }
  
}
public closeModal(): void {
  this.modalService.close();
}
}
