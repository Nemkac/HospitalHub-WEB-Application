import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { FilterCompanies } from 'src/assets/filter-companies';
import { Company } from 'src/company';
import { faStar, faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-compaines-page',
  templateUrl: './compaines-page.component.html'
})
export class CompainesPageComponent implements OnInit{
  companies : Company[] = [];
  filteredCompanies : Company [] = [];
  filterName: string = '';
  filterCountry : string = '';
  filterCity : string = '';
  filterAvgRate : number = 0.0;
  filterCompanies! : FilterCompanies;
  companyId : number | undefined;

  faStar = faStar;
  faHeart = faHeart;
  faBookmark = faBookmark;

  constructor(private showCompaniesService : CompanyService, 
              private route : ActivatedRoute,
              private router : Router) {}

  ngOnInit() : void {
    this.DisplayCompanies();                  
  }

  public DisplayCompanies():void{
    this.showCompaniesService.showCompanies(this.filterName,this.filterCountry,this.filterCity,this.filterAvgRate).subscribe(
      (response:Company[]) => {
        this.showCompaniesService.showCompanies(this.filterName,this.filterCountry,this.filterCity,this.filterAvgRate);
        this.companies = response;
        console.log(this.companies);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public goToCompany(id:number) : void {
    this.showCompaniesService.goToCompany(id);
  }

  public SearchCompanies(name: string, country: string, city: string, avgRate: number):void{
    this.route.queryParams.subscribe(params => {
      this.filterName = name;
      this.filterCountry = country;
      this.filterCity = city;
      this.filterAvgRate = avgRate;
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
