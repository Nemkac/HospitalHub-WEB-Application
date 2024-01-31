import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipmentPickupSlot } from 'src/app/models/EquipmentPickupSlot';
import { EquipmentPickupSlotService } from 'src/app/services/equipment-pickup-slot.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/user';

@Component({
  selector: 'app-create-extra-slot',
  templateUrl: './create-extra-slot.component.html',
})
export class CreateExtraSlotComponent implements OnInit{

  @Output() closeModal: EventEmitter<number> = new EventEmitter<number>();
  companyId!:Number;
  chosenDate!:Date;
  user!:User;
  createdSlot!:EquipmentPickupSlot;
  token = localStorage.getItem('token');

  constructor(private slotService:EquipmentPickupSlotService, private userService:UserService,private modalService: NgbActiveModal,){}
  ngOnInit(): void {
    if(this.token){
      this.userService.getUserByToken(this.token).subscribe(
        (user) => {
          this.user = user;
        }
      )
    }
  }

  saveSlot(form:NgForm) : void{
    if(form.valid){
      const slot = form.value;
      this.slotService.addExtraSlot(this.companyId,slot,this.user.id).subscribe(
        (savedSlot) =>{
          this.closeModal.emit(savedSlot.id)
          this.modalService.close();
          console.log(savedSlot);
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    else {
      alert('Error!');
    }
  }

  /*saveSlot2(form:NgForm) : void{
    if(form.valid){
      const slot = form.value;
      this.slotService.addTestSlot(this.chosenDate).subscribe(
        (savedSlot) =>{
          window.location.reload();
          console.log(savedSlot);
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    else {
      alert('Error!');
    }
  } */

  /*saveSlot() : void{
    console.log(this.chosenDate, this.companyId, this.user.id);
      this.slotService.addExtraSlot(this.companyId,this.chosenDate,this.user.id).subscribe(
        (response:EquipmentPickupSlot) =>{
          window.location.reload();
          console.log(response);
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }*/
  


}
