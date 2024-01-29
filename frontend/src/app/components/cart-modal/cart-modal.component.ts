import { OrderEquipmentDTO } from './../../models/OrderEquipmentDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { EquipmentService } from './../../services/equipment.service';
import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Equipment } from 'src/Equipment';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/company';
import { EquipmentPickupSlot } from 'src/app/models/EquipmentPickupSlot';
import { EquipmentPickupSlotService } from 'src/app/services/equipment-pickup-slot.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
})
export class CartModalComponent implements OnInit{

  companyId : number = 0;
  selectedEquipmentIds : number[] = [];
  selectedAppointmentId : number = 0;
  userId : number = 0;
  handleOrderComplete: (() => void) | undefined;

  company : Company | undefined;
  equipmentList : Equipment[] = [];
  slot : EquipmentPickupSlot | undefined;

  constructor(private modalService: NgbActiveModal,
              private companyService : CompanyService,
              private equipmentService : EquipmentService,
              private equipmentPickupSlotService : EquipmentPickupSlotService,
              private router: Router,
              private toast : NgToastService,
              private location: Location){}

  faClose = faClose;

  ngOnInit(): void {
    this.selectedEquipmentIds.forEach( id => {
      this.equipmentService.getEquipmentById(id).subscribe(
        (response : Equipment) => {
          this.equipmentList.push(response);
        },
        (error : HttpErrorResponse) => {
          alert(error.message);
        }
      )
    });

    this.companyService.getCompany(this.companyId).subscribe(
      (response : Company) => {
        this.company = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.equipmentPickupSlotService.getSlotById(this.selectedAppointmentId).subscribe(
      (response : EquipmentPickupSlot) => {
        this.slot = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public completeOrder() : void{
    const createdOrder: OrderEquipmentDTO = {
      equipmentIds: this.selectedEquipmentIds,
      companyId: this.companyId,
      userId: this.userId,
      pickupSlotId: this.selectedAppointmentId,
    };

    this.equipmentService.orderEquipment(createdOrder).subscribe(
      (response : EquipmentPickupSlot) => {
        console.log(response);
        if (this.handleOrderComplete) {
          this.handleOrderComplete();
        }
      },
      (error : HttpErrorResponse) => {
        //alert(error.message);
        this.toast.error({detail:"Completing order went wrong",summary:"Selected pickup timeslot has been booked by another user in a meanwhile"});
      }
    );

    this.closeModal();
  }

  public closeModal(): void {
    this.modalService.close();
  }
}
