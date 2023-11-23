import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { EquipmentPageComponent } from './pages/equipment-page/equipment-page.component';
import { EquipmentcardComponent } from './components/equipmentcard/equipmentcard.component';
import { CompainesPageComponent } from './pages/compaines-page/compaines-page.component';
import { TestemonialsPageComponent } from './pages/testemonials-page/testemonials-page.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';
import { TestemonialCardComponent } from './components/testemonial-card/testemonial-card.component';

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
      CompainesPageComponent,
      TestemonialsPageComponent,
      PricingPageComponent,
      TestemonialCardComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
