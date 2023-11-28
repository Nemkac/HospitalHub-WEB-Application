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
  byName! : string;
  byCountry! : string;
  byCity!: string;
  byRate!: number;

  faStar = faStar;
  faHeart = faHeart;
  faBookmark = faBookmark;

  constructor(private showCompaniesService : CompanyService, 
              private route : ActivatedRoute,
              private router : Router) {}

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
