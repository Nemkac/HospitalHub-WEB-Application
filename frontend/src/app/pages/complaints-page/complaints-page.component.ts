import { SystemAdministratorService } from 'src/app/services/systemAdministrator.service';
import { Reply } from './../../models/Reply';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/models/Complaint';
import { ComplaintService } from 'src/app/services/complaint.service';
import { faPaperPlane, faSquareCheck, faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-complaints-page',
  templateUrl: './complaints-page.component.html',
})
export class ComplaintsPageComponent implements OnInit {
  faTrash = faTrash;
  faSquareCheck = faSquareCheck
  faPaperPlane = faPaperPlane;
  faClock = faClock

  public complaints: Complaint[] = [];
  public complaintsFlag : boolean = true;
  public selectedComplaint : Complaint | null = null;
  public replied : boolean = false;
  public reply : string = "";
  public replyDateAndTime: string = '';
  public complaintReply: Reply | null = null;
  public processedComplaintsFlag: boolean = false;
  public loggedAdmin: User | undefined;
  public loggedAdminUsername: string = "";
  public isSysAdmin: boolean = false;
  public token = localStorage.getItem('token');

  constructor(private complaintService: ComplaintService,
              private systemAdministratorService: SystemAdministratorService,
              private toast: NgToastService,
              private userService: UserService) {}

  ngOnInit(): void { 
    //this.getComplaints();
    this.checkSystemAdmin();
    this.getUnprocessedComplaints();
  }

  public checkSystemAdmin() : boolean{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
      });
     this.systemAdministratorService.checkSystemAdministrator(headers).subscribe(
      (response : boolean) => {
        this.isSysAdmin = response;
      },(error) => {
        this.isSysAdmin = false;
      }
     );

    return this.isSysAdmin;
  }

  public getUnprocessedComplaints() : void{
    this.complaintService.getAllUnprocessedComplaints().subscribe(
      (response: Complaint[]) => {
        if(response.length === 0){
          this.complaintsFlag = false;
          this.complaints = [];
          this.processedComplaintsFlag = false;
        } else {
          this.processedComplaintsFlag = false;
          this.complaintsFlag = true;
          this.complaints = response;
        }
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getProcessedComplaints() : void{
    this.complaintService.getAllProcessedComplaints().subscribe(
      (response: Complaint[]) => {
        this.complaintsFlag = true;
        this.complaints = response;
        this.processedComplaintsFlag = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getComplaints(): void{
    this.complaintService.getAllComplaints().subscribe(
      (response: Complaint[]) => {
        this.complaints = response
        console.log(this.complaints);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    ); 
  }

  public selectComplaint(id: number): void {
    this.complaintService.getComplaintById(id).subscribe(
      (response: Complaint) => {
        this.selectedComplaint = response;
        if(this.selectedComplaint.reply === null){
          this.replied = false;
        } else {
          this.replied = true;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public replyOnComplaint(id:number, reply:string) : void{
    this.reply = reply;
    const token = localStorage.getItem('token');
    if(token){
      this.userService.getUserByToken(token).subscribe(
        (response: User) => {
          if(response.roles === "ROLE_SYSADMIN"){
            this.loggedAdmin = response;
            this.loggedAdminUsername = response.username;
          } else {
            this.toast.error({detail:"Error message", summary:"Logged user is not system admin"})
          }
        }
      )
    }
    const replyData: Reply = {
      reply: reply,
      replyDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      repliedBy: this.loggedAdminUsername

    };
    this.complaintService.replyOnComplaint(id, replyData).subscribe(
      (response: Complaint) => {
        if(response === null){
          this.toast.error({detail:"Error message", summary:response});
        }
        this.replied = true;
        this.selectedComplaint = response;
        this.complaintService.getAllUnprocessedComplaints().subscribe(
          (response: Complaint[]) => {
            this.complaints = response;
            if(this.complaints.length === 0){
              this.complaintsFlag = false;
            }
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        )
      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Complaint already processed", summary:" Someone else has replied. Please refresh and try again"});
      }
    )
  }
}
