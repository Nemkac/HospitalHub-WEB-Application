import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { FilterCompanies } from 'src/app/models/filter-companies';
import { Company } from 'src/company';
import { faStar, faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/user';

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
  token = localStorage.getItem('token');
  user !: User;
  message !: string;


  faStar = faStar;
  faHeart = faHeart;
  faBookmark = faBookmark;

  constructor(private showCompaniesService : CompanyService, 
              private route : ActivatedRoute,
              private router : Router,
              private userService : UserService,
              private toast : NgToastService
              ) {}

  ngOnInit() : void {
    this.DisplayCompanies();
    if(this.token) {
      this.userService.getUserByToken(this.token).subscribe(
        (user) => {
          this.user = user;
          }
      )
    }                  
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
    if(this.user.penaltyPoints < 3) {
      console.log("Penalty points : ",this.user.penaltyPoints);
      this.showCompaniesService.goToCompany(id);
    } else {
        this.toast.error({detail:"You are under a ban",summary:"You have too many penalty points! They clear out first day of the month."})
    }
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
