import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EquipmentService } from 'src/app/services/equipment.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-equipment-my-company-form',
  templateUrl: './add-equipment-my-company-form.component.html',
})
export class AddEquipmentMyCompanyFormComponent {
  @Input() companyId!: number;
  faClose = faClose;

  constructor(private equipmentService: EquipmentService,
              private modalService: NgbActiveModal,
              private toast: NgToastService) {}

  onAddEquipment(form: NgForm): void {
    if (form.valid) {
      const equipmentData = form.value;

      if (!equipmentData.name || !equipmentData.type || !equipmentData.description || !equipmentData.price || !equipmentData.image) {
        alert('Please enter all required information.');
        return;
      }

      this.equipmentService.addEquipment(equipmentData, this.companyId).subscribe(
        (savedEquipment) => {
          window.location.reload();
          console.log(savedEquipment);
          this.toast.success({detail: "Success" ,summary: "New equipment has been added successfully!"});
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      //alert('Please enter all required information.');
      this.toast.error({detail:"Saving failed", summary:"All fields must be filled!"});
    }
  }

    public closeModal(): void {
      this.modalService.close();
    }

}
