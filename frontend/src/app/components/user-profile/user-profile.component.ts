import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfile } from 'src/app/models/user-profile';
import { ActivatedRoute } from '@angular/router';
import { faGear, faUser, faPlus, faCalendar, faQrcode, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserProfileComponent } from '../update-user-profile/update-user-profile.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/user';
import { EquipmentPickupSlotService } from 'src/app/services/equipment-pickup-slot.service';
import { EquipmentPickupSlot } from 'src/app/models/EquipmentPickupSlot';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid' ;
import { EquipmentPickupSlotDisplayModalComponent } from '../equipment-pickup-slot-display-modal/equipment-pickup-slot-display-modal.component';
import { CreatePickupSlotFormComponent } from '../create-pickup-slot-form/create-pickup-slot-form.component';
import { CreateCompanyAdministratorFormComponent } from '../create-company-administrator-form/create-company-administrator-form.component';
import { CreateNewSysAdmninistratorFormComponent } from '../create-new-sys-admninistrator-form/create-new-sys-admninistrator-form.component';
import { CreateCompanyFormComponent } from '../create-company-form/create-company-form.component';
import { Equipment } from 'src/Equipment';
import { RequestDeliveryService } from 'src/app/services/request-delivery.service';
import { UsersContractsComponent } from '../users-contracts/users-contracts.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit{
  userId! : number;
  userProfile: UserProfile | undefined;
  isCompanyAdmin : boolean = false;
  isSystemAdmin : boolean = false;
  isUser : boolean = false;
  equipmentPickupSlots : EquipmentPickupSlot[] = [];
  token = localStorage.getItem('token');
  user !: User ;
  equipments!:Equipment[];
  slots!:EquipmentPickupSlot[];
  upcomingSlots!:EquipmentPickupSlot[];
  pastSlots!:EquipmentPickupSlot[];
  sortUpcomingBy : 'duration' | 'date' = 'date'
  sortPastBy : 'duration' | 'date' = 'date'


  @ViewChild('calendar') calendarRef!: ElementRef;

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

  constructor(private equipmentPickupSlotService : EquipmentPickupSlotService,
              private userService : UserService,
              private userProfileService:UserProfileService,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private slotService : EquipmentPickupSlotService,
              private requestDeliveryService: RequestDeliveryService,
              private toast : NgToastService){}

  faGear = faGear;
  faUser = faUser;
  faPlus = faPlus;
  faCalendar = faCalendar;
  faQrcode = faQrcode;
  faTrash = faTrash;

  ngOnInit(): void {
    if(this.token){
      this.userService.getUserByToken(this.token).subscribe(
        (response: User) => {
          this.userId = response.id;
          if(response.roles === "ROLE_SYSADMIN"){
            this.isSystemAdmin = true;
          }
          if(response.roles === "ROLE_COMPANYADMIN"){
            this.isCompanyAdmin = true;
            this.getEquipmentPickupSlots(response.id);
          }
          if(response.roles === "ROLE_USER"){
            this.getUsersUpcomingAppointments();
            this.getUsersUpcomingAppointments1();
            this.getUsersPastAppointments();
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    this.showUserProfile();
  }

  goToRequestDelivery(id: number) : void{
    this.requestDeliveryService.goToRequestDelivery(id);
  }

  public getEquipmentPickupSlots(id: number) : void{
    this.equipmentPickupSlotService.getAdminsSlots(id).subscribe(
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

  public showUserProfile():void{
    if(this.token) {
      this.userService.getUserByToken(this.token).subscribe(
        (user) => {
          this.user = user;
          this.userProfileService.showUserProfile(user.id).subscribe(
            (response:UserProfile) => {
              this.userProfile = response;
              console.log(this.userProfile);
            }
          )
        }
      )
    }
  }

  public goToUpdate():void{
    //this.userProfileService.goToUpdateProfile(this.userId);
    const modalRef = this.modalService.open(
			UpdateUserProfileComponent,
			{ backdrop: 'static', keyboard: true }
		  );
		  modalRef.componentInstance.userId = this.userId;
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

  public openCreateCompanyAdminForm() : void {
    const modalRef = this.modalService.open(
      CreateCompanyAdministratorFormComponent,
      { backdrop: 'static', keyboard: true }
    );
  }

  public openCreateSystemAdminForm() : void {
    const modalRef = this.modalService.open(
      CreateNewSysAdmninistratorFormComponent,
      { backdrop: 'static', keyboard: true }
    );
  }
  
  public openCreateCompanyForm() : void {
    const modalRef = this.modalService.open(
      CreateCompanyFormComponent,
      { backdrop: 'static', keyboard: true }
    );
  }

  getUsersUpcomingAppointments(){
    this.userService.getUsersUpcomingAppoitments(this.userId).subscribe(
      (slots) => {
        this.slots = slots;
        console.log("slotovi su ",this.slots);
        slots.forEach(slot => {
          this.getSlotsEquipment(slot.id);
        });
      }
    )
  }

  getUsersUpcomingAppointments1(){
    this.userService.getUsersUpcomingAppoitments1(this.userId).subscribe(
      (slots) => {
        this.upcomingSlots = slots;
        console.log("buduci slotovi su ",this.slots);
        slots.forEach(slot => {
          this.getSlotsEquipment(slot.id);
        });
      }
    )
  }

  getUsersPastAppointments(){
    this.userService.getUsersPastAppoitments(this.userId).subscribe(
      (slots) => {
        this.pastSlots = slots;
        console.log("prosli slotovi su ",this.slots);
        slots.forEach(slot => {
          this.getSlotsEquipment(slot.id);
        });
      }
    )
  }

  getSlotsEquipment(slotId:Number){
      this.slotService.getSlotsEquipment(slotId).subscribe(
        (equipments) => {
          console.log("Ovo su equipmenti", equipments);
          this.equipments = equipments;
        }
      )
  }

  cancelReservation(slotId: number) {
    this.slotService.cancelReservation(slotId).subscribe(
      (slot) => {
        if (slot != null) {
          window.location.reload();
        }
      },
      (error) => {
        this.toast.error({detail:"Cancelation denied",summary:"Reservations within following 24 hours cannot be canceled"})
      }
    );
  }

  sortUpcoming() {
    if (this.sortUpcomingBy === 'duration') {
      this.upcomingSlots.sort((a, b) => a.duration - b.duration);
    } else if (this.sortUpcomingBy === 'date') {
      this.upcomingSlots.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
    }
  }

  sortPast() {
    if (this.sortPastBy === 'duration') {
      this.pastSlots.sort((a, b) => a.duration - b.duration);
    } else if (this.sortPastBy === 'date') {
      this.pastSlots.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
    }
  }

  public goToContracts(){
    const modalRef = this.modalService.open(
      UsersContractsComponent,
      {backdrop:'static',keyboard:true}
    );
    modalRef.componentInstance.userId = this.userId;
  }
  

}
