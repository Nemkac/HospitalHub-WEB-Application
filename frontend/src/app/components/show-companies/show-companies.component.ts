import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { FilterCompanies } from 'src/app/models/filter-companies';
import { Company } from 'src/company';
import { User } from 'src/user';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/services/user.service';


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
  filterCompanies! : FilterCompanies;
  byName! : string;
  byCountry! : string;
  byCity!: string;
  byRate!: number;
  user !: User;
  token = localStorage.getItem('token');
  sortBy : 'name' | 'country' | 'rate' = 'name'
  constructor(private showCompaniesService : CompanyService, 
              private route : ActivatedRoute,
              private router : Router,
              private toast : NgToastService,
              private userService : UserService) {}

  ngOnInit() : void {
    if(this.token) {
      this.userService.getUserByToken(this.token).subscribe(
        (user) => {
          this.user = user;
          }
      )
    } 
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
        //this.showCompaniesService.showCompanies();
        this.companies = response;
        this.sortCompanies();
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

  sortCompanies() {
    let sortedArray: Company[] = []
  
    if (this.sortBy === 'name') {
      sortedArray = [...this.companies].sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy == 'country') {
      sortedArray = [...this.companies].sort((a, b) => a.country.localeCompare(b.country));
    } else if (this.sortBy == 'rate') {
        sortedArray = [...this.companies].sort((a, b) => a.avgRate - b.avgRate);
      }
  
    this.companies = sortedArray;
  }
  
}
