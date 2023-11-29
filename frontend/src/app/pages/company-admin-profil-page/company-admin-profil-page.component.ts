import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/Equipment';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/company';

@Component({
  selector: 'app-company-admin-profil-page',
  templateUrl: './company-admin-profil-page.component.html',
})
export class CompanyAdminProfilPageComponent implements OnInit {
  selectedCompany: Company = {} as Company;  
  equipments: Equipment[] = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getAdminsCompanyData();
  }
  
  getAdminsCompanyData() {
    this.companyService.getAdminsCompany().subscribe(
      (data) => {
        this.selectedCompany = data;
        this.equipments = data.medicalEquipmentList;     
      },
      (error) => {
        console.error('Error fetching company data.', error);
      }
    );
  }
  
  
}


