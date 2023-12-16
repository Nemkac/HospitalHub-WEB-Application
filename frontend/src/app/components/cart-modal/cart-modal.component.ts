import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
})
export class CartModalComponent implements OnInit{

  companyId : number = 0;
  selectedEquipmentIds : number[] = [];
  selectedAppointmentId : number = 0;
  userId : number = 0;

  constructor(private modalService: NgbActiveModal){}

  faClose = faClose;

  ngOnInit(): void {
  }

  public closeModal(): void {
    this.modalService.close();
  }
}
