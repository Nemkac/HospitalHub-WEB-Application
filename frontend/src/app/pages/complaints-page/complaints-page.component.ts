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

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void { 
    this.getComplaints();
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
}
