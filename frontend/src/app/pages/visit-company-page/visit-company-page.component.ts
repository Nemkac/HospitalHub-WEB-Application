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
  ]
})
export class VisitCompanyPageComponent implements OnInit, AfterViewInit{
  companyId! : number;
  equipmentPickupSlots : EquipmentPickupSlot[] = [];
  // selectedCompany !: Company;
  @Input() companyLatitude: number = 0; 
  @Input() companyLongitude: number = 0; 
  public currentDate = new Date();

  selectedCompany: Company = {} as Company;
  equipments: Equipment[] = [];
  token = localStorage.getItem('token');

  showEquipment : boolean = true;
  showCalendar : boolean = false;

  addedToChart : boolean = false;
  appointmentSelected : boolean = false; 

  selectedEquipmentsForOrder : number[] = []
  selectedAppointment : number = 0;

  faCartShopping = faCartShopping;
  faBasketShopping = faBasketShopping;
  faCalendarCheck = faCalendarCheck;

  numOfItemsInCart : number = 0;

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
    this.getEquipmentPickupSlots(this.companyId);
    console.log('Company ID:', this.companyId);
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
  }

  public addEquipmentToOrder(id : number) :void{
    this.selectedEquipmentsForOrder.push(id);
    this.addedToChart = true;
    this.numOfItemsInCart += 1;
  }

  public selectAppointment(id : number) : void{
    this.selectedAppointment = id;
    this.appointmentSelected = true;
  }

  public openChartModal() : void{
    const modalRef = this.modalService.open(
			CartModalComponent,
			{ backdrop: 'static', keyboard: true, centered:true}
		);
  	modalRef.componentInstance.companyId = this.companyId;
    modalRef.componentInstance.selectedAppointmentId = this.selectedAppointment;
    if(this.token){
      this.userService.getUserByToken(this.token).subscribe(
        (response : User) => {
          modalRef.componentInstance.userId = response.id;  
        },
        (error : HttpErrorResponse) => {
          alert(error.message)
        }
      );
    }
    modalRef.componentInstance.handleOrderComplete = this.handleOrderComplete;
    modalRef.componentInstance.selectedEquipmentIds = this.selectedEquipmentsForOrder;
  }

  public handleOrderComplete = (): void => {
    this.selectedEquipmentsForOrder = [];
    this.selectedAppointment = 0;
    this.addedToChart = false;
    this.appointmentSelected = false; 
    this.getEquipmentPickupSlots(this.companyId);
  };
}

