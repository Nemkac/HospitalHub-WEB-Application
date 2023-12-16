import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentPickupSlot } from 'src/app/models/EquipmentPickupSlot';
import { CompanyService } from 'src/app/services/company.service';
import { EquipmentPickupSlotService } from 'src/app/services/equipment-pickup-slot.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-book-equipment',
  templateUrl: './book-equipment.component.html',
})
export class BookEquipmentComponent implements OnInit{

  token = localStorage.getItem('token');
  companyId! : number;
  predefinedSlots! : EquipmentPickupSlot[];
  chosenSlot! : EquipmentPickupSlot;

  constructor(private route:ActivatedRoute,
              private equipmentService : EquipmentService,
              private companyService:CompanyService,
              private equipmentPickUpSlotService : EquipmentPickupSlotService,
              private userService : UserService) {}

  ngOnInit(): void {
    this.companyService.getCompanysSlots(this.companyId).subscribe(
      (slots:EquipmentPickupSlot[]) => {
        this.predefinedSlots = slots;
      }
    )
  }


  occupySlot(event:Event, slot:EquipmentPickupSlot){
    event.preventDefault();
    if(this.token){
      this.userService.getUserByToken(this.token).subscribe(
        (user) => {
          console.log("User je", user.id, "duracija je", slot.duration);
          this.companyService.occupySlot(slot,user.id).subscribe(
            (response:EquipmentPickupSlot) => {
              console.log(response);
            }
          )
          
        }
      )
    }
  }

}
