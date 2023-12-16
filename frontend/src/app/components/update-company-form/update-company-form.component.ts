import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';

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
              private modalService : NgbActiveModal,private companyService : CompanyService) { }
  
  ngOnInit(): void {
  }

  public onUpdateCompany(companyToUpdateForm: NgForm) {
      this.companyService.updateCompany(companyToUpdateForm.value, this.userId).subscribe(
        (response: any) => {
          if (response instanceof Object) {
            this.updateCompany = response;
            window.location.reload();
            console.log(response);
          } else {
            console.log('Update successful');
            window.location.reload();
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
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
