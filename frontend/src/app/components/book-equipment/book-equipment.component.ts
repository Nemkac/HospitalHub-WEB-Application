import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-equipment',
  templateUrl: './book-equipment.component.html',
})
export class BookEquipmentComponent implements OnInit{

  pickUpDate! : Date;

  constructor() {}

  ngOnInit(): void {
    
  }
}
