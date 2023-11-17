import { HttpErrorResponse } from '@angular/common/http';
import { EquipmentService } from './../../services/equipment.service';
import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/Equipment';

@Component({
  selector: 'app-equipmentcard',
  templateUrl: './equipmentcard.component.html',
})
export class EquipmentcardComponent implements OnInit{

  public equipments : Equipment[] = [];

  constructor( private equipmentService : EquipmentService){}

  ngOnInit() : void{
    this.getEquipment();
  }

  public getEquipment() : void{
    this.equipmentService.getEquipment().subscribe(
      (response : Equipment[]) => {
        this.equipments = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
