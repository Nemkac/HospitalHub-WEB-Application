import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ShowCompaniesService } from 'src/app/services/show-companies.service';
import { Company } from 'src/company';

@Component({
  selector: 'app-show-companies',
  templateUrl: './show-companies.component.html',
})

export class ShowCompaniesComponent implements OnInit {
  companies : Company[] = [];
  filterName: string = '';
  filterCountry : string = '';
  filterCity : string = '';
  filterAvgRate : number = 0.0;
  constructor(private showCompaniesService : ShowCompaniesService, private route : ActivatedRoute) {}

  ngOnInit() : void {
    this.ShowCompanies();
  }


  public ShowCompanies():void{
    this.route.queryParams.subscribe(params => {
      this.filterName = params['name'];
      this.filterCountry = params['country'];
      this.filterCity = params['city'];
      this.filterAvgRate = params['avgRate'];
    });
    this.showCompaniesService.showCompanies(this.filterName,this.filterCountry,this.filterCity,this.filterAvgRate).subscribe(
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
