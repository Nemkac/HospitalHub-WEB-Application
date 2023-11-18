import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Equipment } from 'src/Equipment';

@Component({
  selector: 'app-equipment-page',
  templateUrl: './equipment-page.component.html',
})
export class EquipmentPageComponent implements OnInit{
  faSearch = faSearch;

  public equipments: Equipment[] = [];
  public filteredEquipments: Equipment[] = [];

  public searchTerm: string = '';
  public filterTerm: string = '';

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.getEquipment();
  }

  public getEquipment() : void{
    this.equipmentService.getEquipment().subscribe(
      (response : Equipment[]) => {
        this.equipments = response;
        this.filteredEquipments = this.equipments;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEquipment(searchTerm: string): void {
    this.equipmentService.getEquipmentBySearchParameter(searchTerm).subscribe(
      (response: Equipment[]) => {
        console.log(response);
        this.filteredEquipments = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public filterEquipmentByType(filterTerm: string): void{
    this.equipmentService.getEquipmentByFilterParameter(filterTerm).subscribe(
      (response: Equipment[]) => {
        console.log(response);
        this.filteredEquipments = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
