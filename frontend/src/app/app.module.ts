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
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ShowCompaniesComponent } from './components/show-companies/show-companies.component';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
      AppComponent,
      NavbarComponent,
      HerosectionComponent,
      FooterComponent,
      ObjectcardComponent,
      routingComponents,
      UserProfileComponent,
      ShowCompaniesComponent,
      UpdateUserProfileComponent,
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      FontAwesomeModule,
      FormsModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
