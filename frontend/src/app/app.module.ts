import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FullCalendarModule } from '@fullcalendar/angular';

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
import { VisitCompanyPageComponent } from './pages/visit-company-page/visit-company-page.component';
import { UpdateEquipmentMyCompanyComponent } from './components/update-equipment-my-company/update-equipment-my-company.component';
import { AddEquipmentMyCompanyFormComponent } from './components/add-equipment-my-company-form/add-equipment-my-company-form.component';
import { EquipmentPickupSlotDisplayModalComponent } from './components/equipment-pickup-slot-display-modal/equipment-pickup-slot-display-modal.component';
import { CreatePickupSlotFormComponent } from './components/create-pickup-slot-form/create-pickup-slot-form.component';
import { UpcomingAppointmentsComponent } from './components/upcoming-appointments/upcoming-appointments.component';
import { BookEquipmentComponent } from './components/book-equipment/book-equipment.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { CreateExtraSlotComponent } from './components/create-extra-slot/create-extra-slot.component';
import { MessageService } from 'primeng/api';
import { NgToastModule } from 'ng-angular-popup';
import { QrCodeScannerPageComponent } from './pages/qr-code-scanner-page/qr-code-scanner-page.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { RequestDeliveryPageComponent } from './pages/request-delivery-page/request-delivery-page.component';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { UsersContractsComponent } from './components/users-contracts/users-contracts.component';
import { CompanyContractsComponent } from './components/company-contracts/company-contracts.component';
import { StompService } from './services/stomp.service';
import { StompConfig } from '@stomp/ng2-stompjs';
import { QRCodeModule } from 'angularx-qrcode';
//import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { rxStompServiceFactory } from './rx-stomp-service-factory';
import { RxStompService } from './services/rx-stomp.service';

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
          VisitCompanyPageComponent,
          UpdateEquipmentMyCompanyComponent,
          AddEquipmentMyCompanyFormComponent,
          EquipmentPickupSlotDisplayModalComponent,
          CreatePickupSlotFormComponent,
          UpcomingAppointmentsComponent,
          BookEquipmentComponent,
          CartModalComponent,
          CreateExtraSlotComponent,
          QrCodeScannerPageComponent,
          RequestDeliveryPageComponent,
          CreateContractComponent,
          UsersContractsComponent,
          CompanyContractsComponent,
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
          FullCalendarModule,
          NgToastModule,
          ZXingScannerModule,
          QRCodeModule
      ],
      providers: [
        MessageService,
        StompService,
      ],
      bootstrap: [AppComponent],
    })
export class AppModule { }
