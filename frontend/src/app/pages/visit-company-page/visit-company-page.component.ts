import { Component, AfterViewInit, ElementRef, OnInit, Input, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Equipment } from 'src/Equipment';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/company';
import { icon, Marker } from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserProfileComponent } from 'src/app/components/update-user-profile/update-user-profile.component';
import { UpcomingAppointmentsComponent } from 'src/app/components/upcoming-appointments/upcoming-appointments.component';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-visit-company-page',
  templateUrl: './visit-company-page.component.html'
})
export class VisitCompanyPageComponent implements OnInit, AfterViewInit{
  companyId! : number;
  // selectedCompany !: Company;
  @Input() companyLatitude: number = 0; 
  @Input() companyLongitude: number = 0; 

  selectedCompany: Company = {} as Company;
  equipments: Equipment[] = [];
  token = localStorage.getItem('token');

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if(idFromRoute != null) {
    this.companyId =+ idFromRoute
    this.getCompanyData();
    } else {
      console.error('User ID not found in the route');
    }
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  public getCompanyData() : void{
    this.companyService.getCompany(this.companyId).subscribe(
      (response:Company) => {
        this.selectedCompany = response;
        this.equipments = response.medicalEquipmentList;
        this.companyLatitude = response.latitude; 
        this.companyLongitude = response.longitude;
        console.log(this.selectedCompany);
        // Pozovi loadMap() ovde
        this.loadMap();
      },
      (error) => {
        console.error('Error fetching company data.', error);
      }
    );
  }

  
  loadMap() {
    if (this.mapContainer && this.companyLatitude !== 0 && this.companyLongitude !== 0) {
      const map = L.map(this.mapContainer.nativeElement).setView(
        [this.companyLatitude, this.companyLongitude],
        12
      );
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
      L.marker([this.companyLatitude, this.companyLongitude]).addTo(map);
    }
  }

  public goToBookEquipment():void{
    //this.userProfileService.goToUpdateProfile(this.userId);
    const modalRef = this.modalService.open(
			UpcomingAppointmentsComponent,
			{ backdrop: 'static', keyboard: true }
		  );
  
		  // Pass userId and isAdminCompany to the modal
		  //modalRef.componentInstance.userId = 1;
  }
  
  
}

