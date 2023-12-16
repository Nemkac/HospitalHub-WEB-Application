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

  constructor(
    private equipmentService: EquipmentService,
    private route: ActivatedRoute,
    private modalService: NgbActiveModal
  ) {}

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
            window.location.reload();
            console.log(response);
          } else {
            console.log('Update successful');
            window.location.reload();
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
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
