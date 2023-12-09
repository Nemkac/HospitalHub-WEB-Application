import { Reply } from './../../models/Reply';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Complaint } from 'src/app/models/Complaint';
import { ComplaintService } from 'src/app/services/complaint.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

@Component({
  selector: 'app-complaints-page',
  templateUrl: './complaints-page.component.html',
})
export class ComplaintsPageComponent implements OnInit {
  faTrash = faTrash;
  public complaints: Complaint[] = [];
  public complaintsFlag : boolean = true;
  public selectedComplaint : Complaint | null = null;
  public replied : boolean = false;
  faPaperPlane = faPaperPlane;
  public reply : string = "";
  public replyDateAndTime: string = '';
  public complaintReply: Reply | null = null;

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void { 
    //this.getComplaints();
    this.getUnprocessedComplaints();
  }

  public getUnprocessedComplaints() : void{
    this.complaintService.getAllUnprocessedComplaints().subscribe(
      (response: Complaint[]) => {
        if(response.length === 0){
          this.complaintsFlag = false;
          this.complaints = [];
        } else {
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
    const replyData: Reply = {
      reply: reply,
      replyDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    };
    this.complaintService.replyOnComplaint(id, replyData).subscribe(
      (response: Complaint) => {
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
        alert(error.message);
      }
    )
  }
}
