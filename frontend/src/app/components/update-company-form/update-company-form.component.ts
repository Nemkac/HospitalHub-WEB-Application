import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from 'src/company';

@Component({
  selector: 'app-update-company-form',
  templateUrl: './update-company-form.component.html',
})
export class UpdateCompanyFormComponent {
  @Input() company: Company | null = null;
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
