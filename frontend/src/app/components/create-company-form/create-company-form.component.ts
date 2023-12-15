import { HttpErrorResponse } from '@angular/common/http';
import { Company } from './../../../company';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-company-form',
  templateUrl: './create-company-form.component.html',
})
export class CreateCompanyFormComponent implements OnInit{

	faClose = faClose;

  constructor(private companyService: CompanyService,
              private modalService: NgbActiveModal){}

  ngOnInit(): void {}

  public CreateCompany(createCompanyForm: NgForm): void{
    this.companyService.createCompany(createCompanyForm.value).subscribe(
      (response: Company) => {
        console.log(response);
        this.companyService.getCompanies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public closeModal(): void {
		this.modalService.close();
	}
}
