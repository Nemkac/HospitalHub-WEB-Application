import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-company-form',
  templateUrl: './update-company-form.component.html',
})
export class UpdateCompanyFormComponent implements OnInit{
  updateCompany: any = {};
  successMessage: string = '';
  errorMessage: string = '';
  token = localStorage.getItem('token');


  constructor(private http: HttpClient, private userService: UserService) { }
  
  ngOnInit(): void {
    this.getAdminsCompanyData();
  }

  getAdminsCompanyData() {
    if (this.token) {
    this.userService.getUserByToken(this.token).subscribe(
      (user) => {
        this.updateCompany.id = user.id;
      },
    
      (error) => {
        console.error('Error fetching user data.', error);
      }
    );
    }
  }

  onUpdateCompany() {
    console.log('Update Company: ', this.updateCompany);

    this.http
      .put(`http://localhost:8081/api/company/update/${this.updateCompany.id}`, this.updateCompany)
      .subscribe(
        (response) => {
          console.log('Success:', response);
          this.successMessage = 'Company updated successfully!';
          this.errorMessage = '';
          this.clearForm();
        },
        (error) => {
          console.error('Error:', error);
          this.successMessage = '';
          this.errorMessage = 'Failed to update company. Please check the data and try again.';
          this.clearIdAndFocus();
        }
      );
  }

  clearForm() {
    this.updateCompany = {};
  }

  clearIdAndFocus() {
    this.updateCompany.id = null;
    const idInput = document.getElementById('idInput') as HTMLInputElement;
    if (idInput) {
      idInput.focus();
    }
  }
}
