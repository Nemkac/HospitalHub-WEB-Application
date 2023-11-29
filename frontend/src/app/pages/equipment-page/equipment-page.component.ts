import { SearchEquipmentDTO } from './../../../SearchEquipmentDTO';
import { Company } from './../../../company';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  public filteredCompanies: Company[] = [];

  public name: string = '';
  public type: string = '';
  public minPrice : number = 0.0;  
  public maxPrice : number = 0.0;

  @Output() priceRangeChange = new EventEmitter<[number, number]>();

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

  public combinedSearch(name: string, minPrice: number, maxPrice: number, type: string){
    this.equipmentService.getEquipmentByCombinedSearching(name, minPrice, maxPrice, type).subscribe(
      (response: SearchEquipmentDTO) => {
        this.filteredEquipments = response.equipmentDTOList;
        if(name == "" && minPrice == 0 && maxPrice == 0 && type == ""){
          this.filteredCompanies = [];
        } else {
          this.filteredCompanies = response.companies;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
