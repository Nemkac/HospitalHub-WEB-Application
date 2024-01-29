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
import { EquipmentPickupSlotService } from 'src/app/services/equipment-pickup-slot.service';
import { UserDTO } from 'src/app/userDTO';
import * as moment from 'moment-timezone';
import { NgToastService } from 'ng-angular-popup';
import { CompanyContractsComponent } from 'src/app/components/company-contracts/company-contracts.component';

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
  selectedCompany: Company | undefined;
  equipments: Equipment[] = [];
  token = localStorage.getItem('token');
  searchInput: string = '';
  filteredEquipments: Equipment[] = [];
  selectedEquipmentForUpdate: Equipment | null = null;
  equipmentPickupSlots : EquipmentPickupSlot[] = [];
  companyAdministrators : User[] = [];
  userId! : number;
  reservedUsers: UserDTO[] = [];
  isOpen : boolean = false;


  faUser = faUser;
  faStar = faStar;
  faTrash = faTrash;
  faGear = faGear;
  faCamera = faCamera
  faSearch = faSearch;
  faPlus = faPlus;

  showEquipment : boolean = true;
  showCalendar : boolean = false;
  showAdministrators : boolean = false;
  showUsers: boolean = false; 

  
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

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  constructor(private companyService: CompanyService,
              private userService: UserService,
              private equipmentService: EquipmentService,
              private equipmentPickupSlotService : EquipmentPickupSlotService,
              private modalService: NgbModal,
              private toast: NgToastService) {}

  ngOnInit(): void {
    this.getAdminsCompanyData();
    this.checkIsOpen();
  }

  checkIsOpen(): void {
    const now = new Date(); // Trenutno vreme
    const openingTime = this.getOpeningTime();
    const closingTime = this.getClosingTime();
    console.log("Opening time: ", openingTime)
    
    if (openingTime.getTime() > closingTime.getTime()) {
      // Dodajte sledeći uslov da biste rukovali slučajem kada je closingTime pre openingTime (preko ponoći)
      this.isOpen = now.getTime() > openingTime.getTime() || now.getTime() < closingTime.getTime();
    } else {
      this.isOpen = now.getTime() >= openingTime.getTime() && now.getTime() <= closingTime.getTime();
    }
  }
  
  getOpeningTime(): Date {
    if(this.selectedCompany){
        const openingTimeString = this.selectedCompany.openingTime;
    
      if (!openingTimeString) {
        console.error('Opening time is not defined for the company.');
        return new Date(); // Vratite nešto, možda trenutno vreme, kao podrazumevanu vrednost.
      }
    
      const [hours, minutes] = openingTimeString.split(':').map(Number);
    
      if (isNaN(hours) || isNaN(minutes)) {
        console.error('Invalid opening time format:', openingTimeString);
        return new Date(); // Vratite nešto, možda trenutno vreme, kao podrazumevanu vrednost.
      }
    
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    } else {
      return new Date(); 
    }
  }
  
  getClosingTime(): Date {
    if(this.selectedCompany){
      const closingTimeString = this.selectedCompany.closingTime;
  
    if (!closingTimeString) {
      console.error('Closing time is not defined for the company.');
      return new Date(); // Vratite nešto, možda trenutno vreme, kao podrazumevanu vrednost.
    }
  
    const [hours, minutes] = closingTimeString.split(':').map(Number);
  
    if (isNaN(hours) || isNaN(minutes)) {
      console.error('Invalid closing time format:', closingTimeString);
      return new Date(); // Vratite nešto, možda trenutno vreme, kao podrazumevanu vrednost.
    }
  
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
    }else {
      return new Date(); 
    }
  }
  

  get formattedOpeningTime(): string {
    if(this.selectedCompany){
      return this.selectedCompany.openingTime ? this.selectedCompany.openingTime.slice(0, 5) : '';
    } else {
      return '';
    }
  }

  get formattedClosingTime(): string {
    if(this.selectedCompany){
      return this.selectedCompany.closingTime ? this.selectedCompany.closingTime.slice(0, 5) : '';
    } else {
      return '';
    }
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
              if (this.showEquipment) {
                this.equipments = data.medicalEquipmentList;
              }
              this.companyLatitude = data.latitude;
              this.companyLongitude = data.longitude;
              this.filteredEquipments = this.equipments;
  
              this.loadMap();
              this.getReservedUsersList();
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
        (deletedEquipment: Equipment) => {
            console.log('Equipment deleted successfully.', deletedEquipment);
            this.getAdminsCompanyData();
            this.filteredEquipments = this.equipments.filter(e => e.id !== equipmentId);
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

    if (this.token) {
      this.userService.getUserByToken(this.token).subscribe(
        (user) => {
          modalRef.componentInstance.userId = user.id;
        },
        (error) => {
          console.error('Error fetching user data.', error);
        }
      );
    }
  }

  openAddForm() {
    const modalRef = this.modalService.open(
      AddEquipmentMyCompanyFormComponent,
        { backdrop: 'static', keyboard: true }
    );

    modalRef.componentInstance.companyId = this.selectedCompany?.id;
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
    this.showUsers = false;
    this.getAdminsCompanyData();
  }

  public viewCalendar() : void{
    this.showEquipment = false;
    this.showCalendar = true
    this.showAdministrators = false;
    this.showUsers = false;

  }

  public viewAdministrators() : void{
    this.showEquipment = false;
    this.showCalendar = false
    this.showAdministrators = true;
    this.showUsers = false;
  }

  public viewUsers() :void{
    this.showUsers = true;
    this.showEquipment = false;
    this.showCalendar = false;
    this.showAdministrators = false;
  }

  public getReservedUsersList(): void {
      this.equipmentPickupSlotService.getReservedUsers(this.userId).subscribe(
        (response : UserDTO[]) => {
          this.reservedUsers = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
 /* public getAdministrators(id : number) : void {
    this.companyService.getCompanyAdministrators(id).subscribe(
      (response : User[]) => {
        this.companyAdministrators = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }*/

  public handleDeliveryComplete = (): void => {
    this.toast.success({detail:"Delivery successful!", summary:"Equipment successfully delivered. Appointment status: PICKED_UP"});
    this.getAdminsCompanyData();
  };

  public displayEquipmentPickupSlot(slot: EquipmentPickupSlot) : void{
    const modalRef = this.modalService.open(
      EquipmentPickupSlotDisplayModalComponent,
      {
        backdrop: 'static', keyboard: true
      }
    );

    modalRef.componentInstance.slot = slot;
    modalRef.componentInstance.handleDeliveryComplete = this.handleDeliveryComplete;
  }

  openCreatePickupSlotForm(): void {
    const modalRef = this.modalService.open(
      CreatePickupSlotFormComponent,
      { backdrop: 'static', keyboard: true }
    );

    modalRef.componentInstance.userId = this.userId;
  }

  public getEventStyles(extendedProps: any): any {
    if (extendedProps.slot.status === 'EXPIRED') {
      return { backgroundColor: '#c23616', color: '#F5F6FA' };
    } else if (extendedProps.slot.status === 'PICKED_UP') {
      return { backgroundColor: '#fbc531', color: '#003554'};
    } else if (!extendedProps.reservedBy) {
      return { backgroundColor: '#037971', color: '#F5F6FA' };
    } else {
      return { backgroundColor: '#003554', color: '#F5F6FA' };
    }
  }

  public goToCompanyContracts(){
    const modalRef = this.modalService.open(
      CompanyContractsComponent,
      {backdrop:'static',keyboard:true}
    );
    modalRef.componentInstance.companyId = this.selectedCompany?.id;
  }


}