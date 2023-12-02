import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SystemAdministratorService } from 'src/app/services/systemAdministrator.service';
import { UserDTO } from 'src/userDTO';

@Component({
  selector: 'app-create-new-sys-admninistrator-form',
  templateUrl: './create-new-sys-admninistrator-form.component.html',
})
export class CreateNewSysAdmninistratorFormComponent implements OnInit {
	constructor(private systemAdministratorService : SystemAdministratorService) {}

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
}
