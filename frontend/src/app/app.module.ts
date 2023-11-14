import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { FooterComponent } from './components/footer/footer.component';
import { ObjectcardComponent } from './components/objectcard/objectcard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule, routingComponents} from './app-routing.module';
import { UpdateCompanyFormComponent } from './components/update-company-form/update-company-form.component';

@NgModule({
  declarations: [
      AppComponent,
      NavbarComponent,
      HerosectionComponent,
      FooterComponent,
      ObjectcardComponent,
      routingComponents,
      UpdateCompanyFormComponent,
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      FontAwesomeModule,
      FormsModule,
      AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
