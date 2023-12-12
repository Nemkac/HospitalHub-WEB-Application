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
import interactionPlugin from '@fullcalendar/interaction'
import { start } from '@popperjs/core';
import { isSameDay } from 'date-fns';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit{
  userId! : number;
  userProfile!: UserProfile;
  isCompanyAdmin : boolean = false;
  isSystemAdmin : boolean = false;
  isUser : boolean = false;
  equipmentPickupSlots : EquipmentPickupSlot[] = [];
  token = localStorage.getItem('token');
  user !: User ;

  @ViewChild('calendar') calendarRef!: ElementRef;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [],  // Postavi events na prazan niz prilikom inicijalizacije
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
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if(idFromRoute != null) {
    this.userId =+ idFromRoute
    this.showUserProfile();
   // } else {
    //  console.error('User ID not found in the route');
    //}
  } }

  public getEquipmentPickupSlots(id: number) : void{
    this.equipmentPickupSlotService.getAdminsSlots(id).subscribe(
      (response: EquipmentPickupSlot[]) => {
        this.equipmentPickupSlots = response;
        this.calendarOptions.events = this.equipmentPickupSlots.map((slot) => ({
          title: slot.companyAdministrator.user.name,
          start: new Date(slot.dateTime),
          duration: slot.duration,
          extendedProps: {
            start: slot.dateTime,
            duration: slot.duration,
            firstname: slot.companyAdministrator.user.name,
            lastname: slot.companyAdministrator.user.lastName,
          },
        }));
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public showUserProfile1():void{
    this.userProfileService.showUserProfile(this.userId).subscribe(
      (response:UserProfile) => {
        this.userProfile = response;
        console.log(this.userProfile);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
}
