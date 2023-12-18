import { Component, OnInit } from '@angular/core';
import { EquipmentPickupSlot } from 'src/app/models/EquipmentPickupSlot';
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
  constructor ( private userService:UserService) {}


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
      }
    )
  }
}
