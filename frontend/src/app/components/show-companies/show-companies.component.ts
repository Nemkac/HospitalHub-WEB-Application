import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowCompaniesService } from 'src/app/services/show-companies.service';
import { Company } from 'src/company';

@Component({
  selector: 'app-show-companies',
  templateUrl: './show-companies.component.html',
})

export class ShowCompaniesComponent implements OnInit {
  companies : Company[] = [];
  constructor(private showCompaniesService : ShowCompaniesService) {}

  ngOnInit() : void {
    this.ShowCompanies();
  }

  public ShowCompanies():void{
    this.showCompaniesService.showCompanies().subscribe(
      (response:Company[]) => {
        this.showCompaniesService.showCompanies();
        this.companies = response;
        console.log(this.companies);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
