import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { UserDTO } from 'src/userDTO';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-company-administrator-form',
  templateUrl: './update-company-administrator-form.component.html',
})
export class UpdateCompanyAdministratorFormComponent implements OnInit{
  updateCompanyAdministrator: any = {};
  successMessage: string = '';                                 
  errorMessage: string = '';


  constructor(private userService: UserService){}

  ngOnInit(): void {}

  public onUpdateCompanyAdministrator(UpdateCompanyAdministratorForm: NgForm): void {
    
    console.log('Update Company Administrator: ', this.updateCompanyAdministrator);


    this.userService.updateCompanyAdministrator(UpdateCompanyAdministratorForm.value, this.updateCompanyAdministrator.id).subscribe(
      (response: UserDTO) => {
    console.log('Success:', response);
    this.successMessage = 'Administrator updated successfully!';
    this.errorMessage = '';
    this.clearForm();
  }, error => {
    console.error('Error:', error);
    this.successMessage = '';
    this.errorMessage = 'Failed to update company administrator. Please check the data and try again.';
    this.clearIdAndFocus();
  });

  }

  clearForm() {
    this.updateCompanyAdministrator = {};
  }

  clearIdAndFocus() {
    this.updateCompanyAdministrator.id = null;
    const idInput = document.getElementById('idInput') as HTMLInputElement;
    if (idInput) {
      idInput.focus();
    }
  }
}
