import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/company';

@Component({
  selector: 'app-company-admin-profil-page',
  templateUrl: './company-admin-profil-page.component.html',
})
export class CompanyAdminProfilPageComponent implements OnInit {
  selectedCompany: Company = {} as Company;  

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getAdminsCompanyData();
  }
  
  getAdminsCompanyData() {
    this.companyService.getAdminsCompany().subscribe(
      (data) => {
        this.selectedCompany = data;
      },
      (error) => {
        console.error('Došlo je do greške prilikom dohvatanja podataka o kompaniji.', error);
      }
    );
  }
  
}


