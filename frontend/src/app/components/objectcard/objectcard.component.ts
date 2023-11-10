import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/company';
import { faStar, faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-objectcard',
  templateUrl: './objectcard.component.html',
})
export class ObjectcardComponent implements OnInit {
  public companies: Company[] = [];
  faStar = faStar;
  faHeart = faHeart;
  faBookmark = faBookmark;
  constructor(private companyService: CompanyService){}

  ngOnInit(): void {
    this.getCompanies();
  }

  public getCompanies() : void{
    this.companyService.getCompanies().subscribe(
      (response: Company[]) =>{
        this.companies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
