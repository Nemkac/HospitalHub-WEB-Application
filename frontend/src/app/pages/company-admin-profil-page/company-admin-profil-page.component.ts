import { Component, AfterViewInit, ElementRef, OnInit, Input, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Equipment } from 'src/Equipment';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/company';
import { UserService } from 'src/app/services/user.service';
import { icon, Marker } from 'leaflet';
import { faStar, faTrash, faGear, faCamera, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { EquipmentService } from 'src/app/services/equipment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateEquipmentMyCompanyComponent } from 'src/app/components/update-equipment-my-company/update-equipment-my-company.component';
import { AddEquipmentMyCompanyFormComponent } from 'src/app/components/add-equipment-my-company-form/add-equipment-my-company-form.component';
import { UpdateCompanyFormComponent } from 'src/app/components/update-company-form/update-company-form.component';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid' ;
import { EquipmentPickupSlot } from 'src/app/models/EquipmentPickupSlot';
import { CreatePickupSlotFormComponent } from 'src/app/components/create-pickup-slot-form/create-pickup-slot-form.component';
import { EquipmentPickupSlotDisplayModalComponent } from 'src/app/components/equipment-pickup-slot-display-modal/equipment-pickup-slot-display-modal.component';
import { User } from 'src/user';
import { CompanyAdministrator } from 'src/app/models/CompanyAdministrator';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
export class CompanyAdminProfilPageComponent implements OnInit{
  @Input() companyLatitude: number = 0; 
  @Input() companyLongitude: number = 0; 

  selectedCompany: Company = {} as Company;
  equipments: Equipment[] = [];
  token = localStorage.getItem('token');
  searchInput: string = '';
  filteredEquipments: Equipment[] = [];
  selectedEquipmentForUpdate: Equipment | null = null;
  equipmentPickupSlots : EquipmentPickupSlot[] = [];
  companyAdministrators : User[] = [];
  userId! : number;


  faUser = faUser;

  showEquipment : boolean = true;
  showCalendar : boolean = false;
  showAdministrators : boolean = false;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    displayEventEnd: true,
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,dayGridYear'
    },
  };

  faStar = faStar;
  faTrash = faTrash;
  faGear = faGear;
  faCamera = faCamera
  faSearch = faSearch;
  faPlus = faPlus;

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  constructor(private companyService: CompanyService,
              private userService: UserService,
              private equipmentService: EquipmentService,
              private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAdminsCompanyData();
  }
  
  public getAdminsCompanyData() {
    if (this.token) {
      this.userService.getUserByToken(this.token).subscribe(
        (user) => {
          this.userId = user.id;
          this.companyService.getAdminsCompany(user.id).subscribe(
            (data) => {
              this.selectedCompany = data;
              this.getEquipmentPickupSlots(this.selectedCompany.id);
              this.getAdministrators(this.selectedCompany.id);
              if(this.showEquipment){
                this.equipments = data.medicalEquipmentList;
              }
              this.companyLatitude = data.latitude; 
              this.companyLongitude = data.longitude;
              this.filteredEquipments = this.equipments; 

          
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

  public getEquipmentPickupSlots(id: number) : void{
    this.companyService.getCompanysAllAppointments(id).subscribe(
      (response: EquipmentPickupSlot[]) => {
        this.equipmentPickupSlots = response;
        this.calendarOptions.events = this.equipmentPickupSlots.map((slot) => ({
          start: new Date(slot.dateTime),
          end: new Date(slot.dateTime).getMinutes() + slot.duration,
          duration: slot.duration,
          reservedBy : slot.reservedBy,
          extendedProps: {
            slot: slot,
            start: new Date(slot.dateTime),
            duration: slot.duration,
            firstname: slot.reservedBy ? slot.reservedBy.name : null,
            lastname: slot.reservedBy ? slot.reservedBy.lastName : null,
          },
        }));
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getAdministrators(id : number) : void {
    this.companyService.getCompanyAdministrators(id).subscribe(
      (response : User[]) => {
        this.companyAdministrators = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  searchEquipment() {
    if (this.equipments && this.equipments.length > 0) {
      this.filteredEquipments = this.equipments.filter((equipment) =>
        equipment.name.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    }
  }

  deleteEquipment(equipmentId: number) {
    this.equipmentService.deleteEquipment(equipmentId).subscribe(
      () => {
        console.log('Equipment deleted successfully.');
        this.getAdminsCompanyData();
        this.equipments = this.equipments.filter(e => e.id !== equipmentId);
      },
      (error) => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          console.log('Equipment deleted successfully.');
          this.getAdminsCompanyData();
        } else {
          console.error('Failed to delete equipment:', error);
        }
      }
    );  
  }

  openUpdateForm(equipment: Equipment) {
    this.selectedEquipmentForUpdate = equipment;
    this.goToUpdate();
  }
  
  public goToUpdate(): void {
    const modalRef = this.modalService.open(
      UpdateEquipmentMyCompanyComponent,
      { backdrop: 'static', keyboard: true }
    );
  
    modalRef.componentInstance.selectedEquipmentForUpdate = this.selectedEquipmentForUpdate;
  }

  public goToUpdateCompany() : void {
    const modalRef = this.modalService.open(
      UpdateCompanyFormComponent,
      { backdrop: 'static', keyboard: true }
    );
  
    modalRef.componentInstance.company = this.selectedCompany;
  }

  openAddForm() {
    const modalRef = this.modalService.open(
      AddEquipmentMyCompanyFormComponent,
        { backdrop: 'static', keyboard: true }
    );

    modalRef.componentInstance.companyId = this.selectedCompany.id;
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

  public viewEquipment() : void{
    this.showEquipment = true;
    this.showCalendar = false
    this.showAdministrators = false;
  }
  
  public viewCalendar() : void{
    this.showEquipment = false;
    this.showCalendar = true
    this.showAdministrators = false;
  }

  public viewAdministrators() : void{
    this.showEquipment = false;
    this.showCalendar = false
    this.showAdministrators = true;
  }

  public displayEquipmentPickupSlot(slot: EquipmentPickupSlot) : void{
    const modalRef = this.modalService.open(
      EquipmentPickupSlotDisplayModalComponent,
      {
        backdrop: 'static', keyboard: true
      }
    );
    
    modalRef.componentInstance.slot = slot;
  }

  getEventStyles(extendedProps: any): any {
    if (!extendedProps.reservedBy) {
      return { 'background-color': '#037971' };
    } else {
      return { 'background-color' : '#003554' }
    }
  }

  openCreatePickupSlotForm(): void {
    const modalRef = this.modalService.open(
      CreatePickupSlotFormComponent,
      { backdrop: 'static', keyboard: true }
    );

    modalRef.componentInstance.userId = this.userId;
  }
  
}
