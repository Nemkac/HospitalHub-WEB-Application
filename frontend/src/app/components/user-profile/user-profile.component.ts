import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfile } from 'src/app/models/user-profile';
import { ActivatedRoute } from '@angular/router';
import { faGear, faUser, faPlus, faCalendar, faQrcode, faTrash, faFileContract, faClock,faSort } from '@fortawesome/free-solid-svg-icons';
//import { faGear, faUser, faPlus, faCalendar, faQrcode, faTrash } from '@fortawesome/free-solid-svg-icons';
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
import { CancellAppointmentDTO } from 'src/app/models/CancellAppointmentDTO';
import { HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { EquipmentPageComponent } from 'src/app/pages/equipment-page/equipment-page.component';
import { EquipmentPickupSlotDTO } from 'src/app/models/EquipmentPickupSlotDTO';
import { Contract } from 'src/app/models/Contract';
import { ContractService } from 'src/app/services/contract.service';
import { CreateContractComponent } from '../create-contract/create-contract.component';
import { QRcodeEquipmentPickUpSlot } from 'src/app/models/QRcodeEquipmentPickUpSlot';

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
  //slots!:EquipmentPickupSlot[];
  upcomingSlots:EquipmentPickupSlot[] = [];
  upcomingSlotsDTOS:EquipmentPickupSlotDTO[] = [];
  pastSlots:EquipmentPickupSlot[]=[];
  sortUpcomingBy : 'duration' | 'date' = 'date'
  sortPastBy : 'duration' | 'date' = 'date'
  contracts : Contract[] = [];
  QRoutput !: string;
  upcomingQRcodes !: QRcodeEquipmentPickUpSlot[];
  pastQRcodes !: QRcodeEquipmentPickUpSlot[];
  slotsIds !: number[];
  ifShowQRs : boolean = false;
  isAuthorised: boolean = false;


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
              private toast : NgToastService,
              private modalServiceParent: NgbModal,
              private contractService : ContractService){}

  faGear = faGear;
  faUser = faUser;
  faPlus = faPlus;
  faCalendar = faCalendar;
  faQrcode = faQrcode;
  faTrash = faTrash;
  faFileContract = faFileContract;
  faClock = faClock;
  faSort = faSort;

  ngOnInit(): void {
    this.checkIsAuthorised();
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
            //this.getUsersUpcomingAppointments();
            this.getUsersUpcomingAppointments1();
            this.getUsersPastAppointments();
            this.getContracts();
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    this.showUserProfile();
  }

  public checkIsAuthorised() : boolean{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
      });
     this.userService.checkIsAusthorised(headers).subscribe(
      (response : boolean) => {
        this.isAuthorised = response;
      },(error) => {
        this.isAuthorised = false;
      }
     );

    return this.isAuthorised;
  }

  public getContracts() : void {
    this.contractService.getUsersContracts(this.userId).subscribe(
      (usersContracts) => {
        this.contracts = usersContracts;
        console.log(usersContracts);
      }
    )
  }
  getQRcodes(){
    this.equipmentPickupSlotService.getQRcodesOutOfSlots(this.getIdsFromSlots(this.upcomingSlotsDTOS)).subscribe(
      (response:QRcodeEquipmentPickUpSlot[]) => {
        this.upcomingQRcodes = response; 
        console.log("buduci kodovi ",this.upcomingQRcodes);
      }
    )
    this.equipmentPickupSlotService.getQRcodesOutOfSlots(this.getIdsFromSlots(this.pastSlots)).subscribe(
      (response:QRcodeEquipmentPickUpSlot[]) => {
        this.pastQRcodes = response; 
        console.log("prosli kodovi ",this.pastQRcodes);
      }
    )
  }

  goToRequestDelivery(id: number) : void{
    this.requestDeliveryService.goToRequestDelivery(id);
  }

  public cancelAppointment(userId: number, appointmentId: number): void {
    const token = localStorage.getItem('token');
    
    // Set the Authorization header with the bearer token
		const headers = new HttpHeaders({

		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
		});
    const cancellAppointmentDTO: CancellAppointmentDTO = {
        userId: userId,
        appointmentId: appointmentId
    };

    this.equipmentPickupSlotService.cancelAppointment(cancellAppointmentDTO,headers)
      .subscribe(
        (response) => {
            
            console.log(response);
        },
        (error) => {
            
            console.error(error);
        }
    );
  }

  cancelContract(contractId:number){
    this.contractService.cancelContract(contractId).subscribe(
      (canceledContract) => {
        console.log("Contract canceled");
        this.toast.success({detail:"Contract canceled", summary:"You have successfully canceled the montly subscription."})
      }
    )
  }

  updateContract(companyId:number){
    const modalRef = this.modalServiceParent.open(
      CreateContractComponent,
      {backdrop:'static',keyboard:true}
    );
    modalRef.componentInstance.companyId = companyId;
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

  public handleDeliveryComplete = (): void => {
    this.toast.success({detail:"Delivery successful!", summary:"Equipment successfully delivered. Appointment status: PICKED_UP"});
    this.showUserProfile();
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

  /*getUsersUpcomingAppointments(){
    this.userService.getUsersUpcomingAppoitments(this.userId).subscribe(
      (slots) => {
        this.slots = slots;
        console.log("slotovi su ",this.slots);
        slots.forEach(slot => {
          this.getSlotsEquipment(slot.id);
        });
      }
    )
  }*/

  getUsersUpcomingAppointments1(){
    this.userService.getUsersUpcomingAppoitments1(this.userId).subscribe(
      (response: EquipmentPickupSlot[]) => {
        this.upcomingSlots = response;
        console.log("buduci slotovi su ",this.upcomingSlots);
        this.upcomingSlots.forEach(slot => {
          const dto : EquipmentPickupSlotDTO = {
            id: slot.id,
            dateTime: slot.dateTime,
            duration: slot.duration,
            reservedBy: slot.reservedBy,
            companyAdministrator: slot.companyAdministrator,
            equipment: slot.equipment,
            status: slot.status,
            version: slot.version,
            companyId: slot.companyAdministrator.compAdminId
          }          
          this.upcomingSlotsDTOS.push(dto)
          console.log("slot: ",dto);
          this.getSlotsEquipment(slot.id);
        });
      }
    )
  }

  getUsersPastAppointments(){
    this.userService.getUsersPastAppoitments(this.userId).subscribe(
      (slots) => {
        this.pastSlots = slots;
        console.log("prosli slotovi su ",this.pastSlots);
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
          this.toast.success({detail:"Reservation canceled",summary:"Be carefull. Canceling too many reservation can make you banned."})
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      },
      (error) => {
        this.toast.error({detail:"Cancelation denied",summary:"Reservations within following 24 hours cannot be canceled"})
      }
    );
  }


  sortUpcoming() {
    if (this.sortUpcomingBy === 'duration') {
      this.upcomingSlotsDTOS.sort((a, b) => a.duration - b.duration);
    } else if (this.sortUpcomingBy === 'date') {
      this.upcomingSlotsDTOS.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
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

  public showQRs(){
    if(this.ifShowQRs == true) {
      this.ifShowQRs = false;
    } else {
      this.equipmentPickupSlotService.getQRcodesOutOfSlots(this.getIdsFromSlots(this.upcomingSlotsDTOS)).subscribe(
        (response:QRcodeEquipmentPickUpSlot[]) => {
          this.upcomingQRcodes = response;
        }
      )
      this.equipmentPickupSlotService.getQRcodesOutOfSlots(this.getIdsFromSlots(this.pastSlots)).subscribe(
        (response:QRcodeEquipmentPickUpSlot[]) => {
          this.pastQRcodes = response;
        }
      )
      this.ifShowQRs = true;
    }
    }

  getQRCodeBySlotIdUpcoming(slotId: number): any {
      const qrCode = this.upcomingQRcodes.find(qr => qr.id === slotId);
      return qrCode || {};
    }

  getQRCodeBySlotIdPast(slotId: number): any {
      const qrCode = this.pastQRcodes.find(qr => qr.id === slotId);
      return qrCode || {};
    }
    
  

  public getIdsFromSlots(slots:EquipmentPickupSlot[]):number[]{
    let slotIds : number[] = [];
    slots.forEach(slot => {
      slotIds.push(slot.id)
    })
    return slotIds;
  }
  

}
