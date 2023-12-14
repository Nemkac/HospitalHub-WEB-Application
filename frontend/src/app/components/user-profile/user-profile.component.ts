import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfile } from 'src/app/models/user-profile';
import { ActivatedRoute } from '@angular/router';
import { faGear, faUser } from '@fortawesome/free-solid-svg-icons';
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
              private modalService: NgbModal){}

  faGear = faGear;
  faUser = faUser;

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
  
		  // Pass userId and isAdminCompany to the modal
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

  getEventStyles(extendedProps: any): any {
    if (!extendedProps.reservedBy) {
      return { 'background-color': '#037971' };
    } else {
      return { 'background-color' : '#003554' }
    }
  }
}
