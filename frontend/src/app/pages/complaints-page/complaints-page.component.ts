import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Complaint } from 'src/app/models/Complaint';
import { ComplaintService } from 'src/app/services/complaint.service';

@Component({
  selector: 'app-complaints-page',
  templateUrl: './complaints-page.component.html',
})
export class ComplaintsPageComponent implements OnInit {
  faTrash = faTrash;
  public complaints: Complaint[] = [];
  public complaintsFlag : boolean = true;
  public selectedComplaint : Complaint | null = null;

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void { 
    this.getComplaints();
    //this.getUnprocessedComplaints(); <------TREBA VRATITI OVO
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
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
