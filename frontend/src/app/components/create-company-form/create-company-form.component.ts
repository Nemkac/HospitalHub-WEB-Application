import { HttpErrorResponse } from '@angular/common/http';
import { Company } from './../../../company';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-create-company-form',
  templateUrl: './create-company-form.component.html',
})
export class CreateCompanyFormComponent implements OnInit{

	faClose = faClose;

  constructor(private companyService: CompanyService,
              private modalService: NgbActiveModal,
              private toast: NgToastService){}

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  map: any;
  destinationMarker: L.Marker | null = null
	destinationLatitude: number = 0;
	destinationLongitude: number = 0;

  ngOnInit(): void {
    this.loadMap()
  }

  public loadMap() : void {
    if (this.mapContainer) {
      this.map = L.map(this.mapContainer.nativeElement).setView(
        [45.267136, 19.833549],
        11
      );
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      this.chooseLocation();
    }
  }

  public chooseLocation() : void{
    this.map.on('click', (e : any) => {
			if(this.destinationMarker === null){
				this.destinationLatitude = e.latlng.lat;
				this.destinationLongitude = e.latlng.lng;
				this.destinationMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map!);
			}
		});
  }

  

  public CreateCompany(createCompanyForm: NgForm): void{
    this.companyService.createCompany(createCompanyForm.value).subscribe(
      (response: Company) => {
        console.log(response);
        this.companyService.getCompanies();
        this.toast.success({detail:"Success!", summary:"Company created successfully."});
        this.closeModal();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public closeModal(): void {
		this.modalService.close();
	}
}
