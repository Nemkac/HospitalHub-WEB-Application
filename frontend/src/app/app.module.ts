import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { FooterComponent } from './components/footer/footer.component';
import { ObjectcardComponent } from './components/objectcard/objectcard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule, routingComponents} from './app-routing.module';
import { UpdateCompanyFormComponent } from './components/update-company-form/update-company-form.component';
import { UpdateCompanyAdministratorFormComponent } from './components/update-company-administrator-form/update-company-administrator-form.component';
import { CreateCompanyAdministratorFormComponent } from './components/create-company-administrator-form/create-company-administrator-form.component';
import { CompanyAdminProfilPageComponent } from './pages/company-admin-profil-page/company-admin-profil-page.component';

import { EquipmentPageComponent } from './pages/equipment-page/equipment-page.component';
import { EquipmentcardComponent } from './components/equipmentcard/equipmentcard.component';
import { CompainesPageComponent } from './pages/compaines-page/compaines-page.component';
import { TestemonialsPageComponent } from './pages/testemonials-page/testemonials-page.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';
import { TestemonialCardComponent } from './components/testemonial-card/testemonial-card.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ShowCompaniesComponent } from './components/show-companies/show-companies.component';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BackToTopButtonComponent } from './components/back-to-top-button/back-to-top-button.component';
import { CreateNewSysAdmninistratorFormComponent } from './components/create-new-sys-admninistrator-form/create-new-sys-admninistrator-form.component';
import { PasswordChangeModalComponent } from './components/password-change-modal/password-change-modal.component';
import { ComplaintsPageComponent } from './pages/complaints-page/complaints-page.component';
import { MapComponent } from './map/map.component';
import { VisitCompanyPageComponent } from './pages/visit-company-page/visit-company-page.component';

@NgModule({
      declarations: [
          AppComponent,
          NavbarComponent,
          HerosectionComponent,
          FooterComponent,
          ObjectcardComponent,
          routingComponents,
          UpdateCompanyFormComponent,
          UpdateCompanyAdministratorFormComponent,
          CreateCompanyAdministratorFormComponent,
          EquipmentPageComponent,
          EquipmentcardComponent,
          CompanyAdminProfilPageComponent,
          CompainesPageComponent,
          TestemonialsPageComponent,
          PricingPageComponent,
          TestemonialCardComponent,
          UserProfileComponent,
          ShowCompaniesComponent,
          UpdateUserProfileComponent,
          BackToTopButtonComponent,
          RegisterFormComponent,
          LogInFormComponent,
          CreateNewSysAdmninistratorFormComponent,
          PasswordChangeModalComponent,
          ComplaintsPageComponent,
          MapComponent,
          VisitCompanyPageComponent,
      ],
      imports: [
          BrowserAnimationsModule,
          BrowserModule,
          HttpClientModule,
          FontAwesomeModule,
          FormsModule,
          AppRoutingModule,
          NgbModule,
          NgbCarouselModule,
          CarouselModule,
          BrowserAnimationsModule,
          MatFormFieldModule,
          MatInputModule,
          MatDatepickerModule,
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
