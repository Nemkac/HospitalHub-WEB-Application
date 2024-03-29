import { Equipment } from './../../../Equipment';
import { Component, AfterViewInit, ElementRef, OnInit, Input, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/company';
import { icon, Marker } from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserProfileComponent } from 'src/app/components/update-user-profile/update-user-profile.component';
import { UpcomingAppointmentsComponent } from 'src/app/components/upcoming-appointments/upcoming-appointments.component';
import { BookEquipmentComponent } from 'src/app/components/book-equipment/book-equipment.component';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid' ;
import { EquipmentPickupSlot } from 'src/app/models/EquipmentPickupSlot';
import { HttpErrorResponse } from '@angular/common/http';
import { faCartShopping, faBasketShopping, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { CartModalComponent } from 'src/app/components/cart-modal/cart-modal.component';
import { User } from 'src/user';
import { startOfMonth, addMonths } from 'date-fns';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CreateExtraSlotComponent } from 'src/app/components/create-extra-slot/create-extra-slot.component';
import { MessageService } from 'primeng/api'
import { NgToastService } from 'ng-angular-popup'
import * as moment from 'moment-timezone';
import { EquipmentService } from 'src/app/services/equipment.service';
import { CreateContractComponent } from 'src/app/components/create-contract/create-contract.component';


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
  templateUrl: './visit-company-page.component.html',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-30%)'
      })),
      transition('void <=> *', animate('0.4s ease-in-out')),
    ])
  ],
  providers: [MessageService]
})
export class VisitCompanyPageComponent implements OnInit, AfterViewInit{
  companyId! : number;
  equipmentPickupSlots : EquipmentPickupSlot[] = [];
  // selectedCompany !: Company;
  @Input() companyLatitude: number = 0; 
  @Input() companyLongitude: number = 0; 
  public currentDate = new Date();

  selectedCompany: Company | undefined;
  equipments: Equipment[] = [];
  token = localStorage.getItem('token');
  loggedUser : User | null = null;

  showEquipment : boolean = true;
  showCalendar : boolean = false;
  isOpen : boolean = false;

  addedToChart : boolean = false;
  appointmentSelected : boolean = false; 

  selectedEquipmentsForOrder : number[] = []
  selectedAppointment : number = 0;

  faCartShopping = faCartShopping;
  faBasketShopping = faBasketShopping;
  faCalendarCheck = faCalendarCheck;

  numOfItemsInCart : number = 0;

  isAddedToCart = false;
  selectedEquipmentId: number | null = null;

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
    validRange: {
      start: startOfMonth(this.currentDate),
      end: addMonths(this.currentDate, 12)
    },
  };

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private userService: UserService,
              private modalService: NgbModal,
              private messageService: MessageService,
              private equipmentService: EquipmentService,
              private toast: NgToastService) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if(idFromRoute != null) {
      this.companyId =+ idFromRoute
      this.getCompanyData();
      this.getEquipmentPickupSlots(this.companyId);
      console.log('Company ID:', this.companyId);
      this.checkIsOpen();
    }
    if(this.token){
      this.userService.getUserByToken(this.token).subscribe(
        (response : User) => {
          this.loggedUser = response;  
        }
      );
    }
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

  ngAfterViewInit(): void {
    this.loadMap();
  }

  public getCompanyData() : void{
    this.companyService.getCompany(this.companyId).subscribe(
      (response:Company) => {
        this.selectedCompany = response;
        if(this.showEquipment){
          this.equipments = response.medicalEquipmentList;
          console.log("verzija prve", this.equipments[0].version)
          console.log("OPREME",this.equipments);
          
        }
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

  public getEquipmentPickupSlots(id: number) : void{
    this.companyService.getCompanysFreeAppointments(this.companyId).subscribe(
      (response: EquipmentPickupSlot[]) => {
        this.equipmentPickupSlots = response;
        this.calendarOptions.events = this.equipmentPickupSlots.map((slot) => ({
          start: new Date(slot.dateTime),
          end: new Date(slot.dateTime).getMinutes() + slot.duration,
          duration: slot.duration,
          extendedProps: {
            slot: slot,
            start: new Date(slot.dateTime),
            duration: slot.duration,
          },
        }));
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
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
			BookEquipmentComponent,
			{ backdrop: 'static', keyboard: true, centered:true}
		  );
  		modalRef.componentInstance.companyId = this.companyId;
  }

  public viewEquipment() : void{
    this.showEquipment = true;
    this.showCalendar = false
  }
  
  public viewCalendar() : void{
    this.showEquipment = false;
    this.showCalendar = true
  }

  public createContract(){
    const modalRef = this.modalService.open(
      CreateContractComponent,
      {backdrop:'static',keyboard:true}
    );
    modalRef.componentInstance.companyId = this.companyId;
  }

  public getEventStyles(extendedProps: any): any {
    if (!extendedProps.reservedBy) {
      if (this.appointmentSelected && this.selectedAppointment === extendedProps.slot.id) {
        return { 'background-color': '#00A6FB' };
      } else {
        return { 'background-color': '#037971' };
      }
    } else {
      return { 'background-color' : '#003554' };
    }
  }

  openCreatePickupSlotForm(): void {
    const modalRef = this.modalService.open(
			CreateExtraSlotComponent,
			{ backdrop: 'static', keyboard: true, centered:true}
		  );
  		modalRef.componentInstance.companyId = this.companyId;

      modalRef.componentInstance.closeModal.subscribe((slotId: number) => {
        // Use slotId in the parent component
        this.selectedAppointment = slotId;
      });
  }

  public addEquipmentToOrder(id : number,version : number) :void{


    this.equipmentService.getEquipmentById(id,version).subscribe(
      (response: Equipment) => {
        
        if(response.quantity > 0) {
          this.selectedEquipmentsForOrder.push(id);
          console.log(this.selectedEquipmentsForOrder);
          this.addedToChart = true;
          this.numOfItemsInCart += 1;
          const selectedEquipment = this.equipments.find(equipment => equipment.id === id);
          if (selectedEquipment) {
            selectedEquipment.isAddedToCart = true;
            setTimeout(() => {
              selectedEquipment.isAddedToCart = false;
           }, 1500);
          }
        } else {
          this.toast.error({detail: "Error message", summary:"Equipment out of stock!"});
        }
      },
      (error : HttpErrorResponse) =>{
        if(error.status === 409){
          this.toast.error({detail: "Error message", summary:"Piece of equipment already ordered!"});
        }
      }
      
    )
  }

  public selectAppointment(id : number) : void{
    this.selectedAppointment = id;
    this.appointmentSelected = true;
  }

  public openChartModal() : void{
    if(this.loggedUser === null){
      this.toast.error({detail:"Error message", summary:"You must log in before purchase!"});
    } else{
      if(this.companyId !== 0 && this.selectedAppointment !== 0 && this.selectedEquipmentsForOrder.length > 0){
        const modalRef = this.modalService.open(
          CartModalComponent,
          { backdrop: 'static', keyboard: true, centered:true}
        );
        modalRef.componentInstance.companyId = this.companyId;
        modalRef.componentInstance.selectedAppointmentId = this.selectedAppointment;
        modalRef.componentInstance.handleOrderComplete = this.handleOrderComplete;
        modalRef.componentInstance.selectedEquipmentIds = this.selectedEquipmentsForOrder;
        modalRef.componentInstance.userId = this.loggedUser.id;  
      } else if(this.selectedAppointment === 0) {
        this.toast.error({detail: "Error message", summary:"You must select date!"});
      } else if(this.selectedEquipmentsForOrder.length === 0){
        this.toast.error({detail: "Error message", summary:"You must select equipment!"});
      } else {
        this.toast.error({detail: "Error message", summary:"Error while creating cart!"});
      }
    }
  }

  public handleOrderComplete = (): void => {
    this.selectedEquipmentsForOrder = [];
    this.selectedAppointment = 0;
    this.addedToChart = false;
    this.appointmentSelected = false;
    this.numOfItemsInCart = 0;
    this.toast.success({detail:"Order created successfully", summary:"Order details have been sent to your email."});
    this.getEquipmentPickupSlots(this.companyId);
  };
}

function onModalClose() {
  throw new Error('Function not implemented.');
}

