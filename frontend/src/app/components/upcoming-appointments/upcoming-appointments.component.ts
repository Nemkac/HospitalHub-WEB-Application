import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from 'src/Equipment';
import { EquipmentPickupSlot } from 'src/app/models/EquipmentPickupSlot';
import { EquipmentPickupSlotService } from 'src/app/services/equipment-pickup-slot.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/user';

@Component({
  selector: 'app-upcoming-appointments',
  templateUrl: './upcoming-appointments.component.html'
})
export class UpcomingAppointmentsComponent implements OnInit {

  user!:User;
  token = localStorage.getItem('token');
  slots!:EquipmentPickupSlot[];
  equipments!:Equipment[];
  constructor ( private userService:UserService, private slotService:EquipmentPickupSlotService) {}


  ngOnInit(): void {
    if(this.token){
      this.userService.getUserByToken(this.token).subscribe(
        (user) => {
          this.user = user;
          this.getUsersUpcomingAppointments();
        }
      )
    }
  }

  getUsersUpcomingAppointments(){
    this.userService.getUsersUpcomingAppoitments(this.user.id).subscribe(
      (slots) => {
        this.slots = slots;
        console.log("slotovi su ",this.slots);
        slots.forEach(slot => {
          this.getSlotsEquipment(slot.id);
        });
      }
    )
  }

  getSlotsEquipment(slotId:Number){
      this.slotService.getSlotsEquipment(slotId).subscribe(
        (equipments) => {
          console.log("Ovo su equipmenti", equipments);
          this.equipments = equipments;
        }
      )
  }
}
