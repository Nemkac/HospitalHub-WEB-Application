import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-company-form',
  templateUrl: './update-company-form.component.html',
})
export class UpdateCompanyFormComponent {
  updateCompany: any = {};
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  onUpdateCompany() {
    console.log('Update Company: ', this.updateCompany);

    this.http.put(`http://localhost:8081/api/company/update/${this.updateCompany.id}`, this.updateCompany)
      .subscribe(response => {
        console.log('Success:', response);
        this.successMessage = 'Company updated successfully!';
        this.errorMessage = '';
        this.clearForm();
      }, error => {
        console.error('Error:', error);
        this.successMessage = '';
        this.errorMessage = 'Failed to update company. Please check the data and try again.';
        this.clearIdAndFocus();
      });
  }

  // Dodaj funkciju za čišćenje forme
  clearForm() {
    this.updateCompany = {};
  }

  // Dodaj funkciju za čišćenje ID-a i postavljanje fokusa
  clearIdAndFocus() {
    this.updateCompany.id = null;
    const idInput = document.getElementById('idInput') as HTMLInputElement;
    if (idInput) {
      idInput.focus();
    }
  }
}
