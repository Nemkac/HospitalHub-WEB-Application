import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Equipment } from 'src/Equipment';
import { EquipmentToUpdate } from 'src/app/EquipmentToUpdate';
import { EquipmentService } from 'src/app/services/equipment.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-update-equipment-my-company',
  templateUrl: './update-equipment-my-company.component.html',
})

export class UpdateEquipmentMyCompanyComponent implements OnInit {
  @Input() selectedEquipmentForUpdate: Equipment | null = null;
  equipmentId!: number;
  updateEquipment!: EquipmentToUpdate; 
  equipment!: Equipment;
  successMessage: string = '';
  errorMessage: string = '';
  faClose = faClose;
  formClosed: any;

  constructor(private equipmentService: EquipmentService,
              private route: ActivatedRoute,
              private modalService: NgbActiveModal,
              private toast: NgToastService) {}

  ngOnInit(): void {
    if (this.selectedEquipmentForUpdate) {
      this.equipment = { ...this.selectedEquipmentForUpdate }; 
      this.updateEquipment = { ...this.selectedEquipmentForUpdate };
    }
  }

  public onUpdateEquipment(equipmentToUpdateForm: NgForm): void {
    if (this.equipment.id) {
      this.equipmentService.updateEquipment(this.equipment.id, equipmentToUpdateForm.value).subscribe(
        (response: any) => {
          if (response instanceof Object) {
            this.updateEquipment = response;
            console.log(response);
            this.closeModal();
            this.toast.success({detail: "Success" ,summary: "Equipment has been updated successfully!"});
            window.location.reload();
          } else {
            console.log('Update successful');
            this.closeModal();
            this.toast.success({detail: "Success" ,summary: "Equipment has been updated successfully!"});
            window.location.reload();
          }
        },
        (error: HttpErrorResponse) => {
          //alert(error.message);
          this.toast.error({detail:"Updating failed", summary:"Invalid data!"});
        }
      );
    }
  }
  
  public clearForm(): void {
    this.modalService.close();
  }

  public closeModal(): void {
    this.modalService.close();
  }
}
