import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SystemAdministratorService } from 'src/app/services/systemAdministrator.service';
import { UserDTO } from 'src/userDTO';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-new-sys-admninistrator-form',
  templateUrl: './create-new-sys-admninistrator-form.component.html',
})
export class CreateNewSysAdmninistratorFormComponent implements OnInit {
	
	faClose = faClose;

	constructor(private systemAdministratorService : SystemAdministratorService,
				private modalService: NgbActiveModal) {}

	ngOnInit() : void {}

	public CreateSysAdministrator(createSysAdministratorForm : NgForm) : void{
		this.systemAdministratorService.createSystemAdministrator(createSysAdministratorForm.value).subscribe(
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
