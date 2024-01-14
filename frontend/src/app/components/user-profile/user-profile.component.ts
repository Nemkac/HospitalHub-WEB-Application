import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfile } from 'src/app/models/user-profile';
import { ActivatedRoute } from '@angular/router';
import { faGear, faUser, faPlus, faCalendar, faQrcode } from '@fortawesome/free-solid-svg-icons';
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
import { start } from '@popperjs/core';
import { isSameDay } from 'date-fns';
import { EquipmentPickupSlotDisplayModalComponent } from '../equipment-pickup-slot-display-modal/equipment-pickup-slot-display-modal.component';
import { CreatePickupSlotFormComponent } from '../create-pickup-slot-form/create-pickup-slot-form.component';
import { CreateCompanyAdministratorFormComponent } from '../create-company-administrator-form/create-company-administrator-form.component';
import { CreateNewSysAdmninistratorFormComponent } from '../create-new-sys-admninistrator-form/create-new-sys-admninistrator-form.component';
import { CreateCompanyFormComponent } from '../create-company-form/create-company-form.component';
import { Equipment } from 'src/Equipment';

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
              private slotService : EquipmentPickupSlotService){}

  faGear = faGear;
  faUser = faUser;
  faPlus = faPlus;
  faCalendar = faCalendar;
  faQrcode = faQrcode;

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
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    this.showUserProfile();
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

  getSlotsEquipment(slotId:Number){
      this.slotService.getSlotsEquipment(slotId).subscribe(
        (equipments) => {
          console.log("Ovo su equipmenti", equipments);
          this.equipments = equipments;
        }
      )
  }
}
