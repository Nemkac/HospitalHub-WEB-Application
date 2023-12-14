import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'src/app/services/equipment.service';


@Component({
  selector: 'app-book-equipment',
  templateUrl: './book-equipment.component.html',
})
export class BookEquipmentComponent implements OnInit{

  addedDate! : Date;
  companyId! : number;
  availableDates! : Date[];
  chosenDate! : Date;

  constructor(private route:ActivatedRoute,
              private equipmentService : EquipmentService) {}

  ngOnInit(): void {
    this.checkForDates();
  }


  checkForDates(){
    this.equipmentService.getAvailableDaysInFollowinTen(this.companyId).subscribe(
      (response:Date[]) => {
        this.availableDates = response;
        console.log(response);
      }
    )
  }

  doSome(event:Event, date:Date){
    event.preventDefault();
    this.chosenDate = date;
  }

}
