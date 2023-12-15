import { HttpErrorResponse } from '@angular/common/http';
import { UserDTO } from './../../../userDTO';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SystemAdministratorService } from 'src/app/services/systemAdministrator.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-create-company-administrator-form',
	templateUrl: './create-company-administrator-form.component.html',
})
export class CreateCompanyAdministratorFormComponent implements OnInit{

	faClose = faClose;

	constructor(private systemAdministratorService : SystemAdministratorService,
				private modalService: NgbActiveModal) {}

	ngOnInit() : void {}

	public CreateCompanyAdministrator(createCompanyAdministratorForm : NgForm) : void{
		this.systemAdministratorService.createCompanyAdministrator(createCompanyAdministratorForm.value).subscribe(
			(response: UserDTO) => {
				console.log(response);
			}, 
			(error : HttpErrorResponse) => {
				alert(error.message);
			}
		);
	}

	public closeModal(): void {
		this.modalService.close();
	}
}
