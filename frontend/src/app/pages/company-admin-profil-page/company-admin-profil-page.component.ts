import { Component, AfterViewInit, ElementRef, OnInit, Input, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Equipment } from 'src/Equipment';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/company';
import { UserService } from 'src/app/services/user.service';
import { icon, Marker } from 'leaflet';
import { faStar, faTrash, faGear, faCamera, faSearch } from '@fortawesome/free-solid-svg-icons';
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
  selector: 'app-company-admin-profil-page',
  templateUrl: './company-admin-profil-page.component.html',
})
export class CompanyAdminProfilPageComponent implements OnInit, AfterViewInit {
  @Input() companyLatitude: number = 0; 
  @Input() companyLongitude: number = 0; 

  selectedCompany: Company = {} as Company;
  equipments: Equipment[] = [];
  token = localStorage.getItem('token');

  faStar = faStar;
  faTrash = faTrash;
  faGear = faGear;
  faCamera = faCamera
  faSearch = faSearch;

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  constructor(
    private companyService: CompanyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAdminsCompanyData();
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  getAdminsCompanyData() {
    if (this.token) {
      this.userService.getUserByToken(this.token).subscribe(
        (user) => {
          this.companyService.getAdminsCompany(user.id).subscribe(
            (data) => {
              this.selectedCompany = data;
              this.equipments = data.medicalEquipmentList;
              this.companyLatitude = data.latitude; 
              this.companyLongitude = data.longitude;
  
              // Pozovi loadMap() ovde
              this.loadMap();
            },
            (error) => {
              console.error('Error fetching company data.', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching user data.', error);
        }
      );
    }
  
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
  
  
}
