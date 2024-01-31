import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-update-company-form',
  templateUrl: './update-company-form.component.html',
})
export class UpdateCompanyFormComponent implements OnInit{
  @Input() userId!: number;
  updateCompany: any = {};
  successMessage: string = '';
  errorMessage: string = '';
  token = localStorage.getItem('token');

  faClose = faClose;

  constructor(private http: HttpClient, private userService: UserService,
              private modalService : NgbActiveModal,private companyService : CompanyService,
              private toast: NgToastService) { }
  
  ngOnInit(): void {
  }

  public onUpdateCompany(companyToUpdateForm: NgForm) {
      this.companyService.updateCompany(companyToUpdateForm.value, this.userId).subscribe(
        (response: any) => {
          if (response instanceof Object) {
            this.updateCompany = response;
            this.toast.success({detail: "Success" ,summary: "Company has been updated successfully!"});
            window.location.reload();
            console.log(response);
          } else {
            //console.log('Update successful');
            this.toast.success({detail: "Success" ,summary: "Company has been updated successfully!"});
            window.location.reload();
          }
        },
        (error: HttpErrorResponse) => {
          //alert(error.message);
          this.toast.error({detail: "Error message" ,summary: "Error updating company information!" + error.message});
        }
      );
  }

  public clearForm(): void {
    this.modalService.close();
  }

  public closeModal(): void {
    this.modalService.close();
  }
}
