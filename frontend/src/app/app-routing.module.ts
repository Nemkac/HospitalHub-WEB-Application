import { Complaint } from './models/Complaint';
import { EquipmentPageComponent } from './pages/equipment-page/equipment-page.component';
import { SystemAdminProfilePageComponent } from './pages/system-admin-profile-page/system-admin-profile-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CreateCompanyFormComponent } from './components/create-company-form/create-company-form.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyAdminProfilPageComponent } from './pages/company-admin-profil-page/company-admin-profil-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ShowCompaniesComponent } from './components/show-companies/show-companies.component';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile.component';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ComplaintsPageComponent } from './pages/complaints-page/complaints-page.component';
import { VisitCompanyPageComponent } from './pages/visit-company-page/visit-company-page.component';
import { UpcomingAppointmentsComponent } from './components/upcoming-appointments/upcoming-appointments.component';
import { QrCodeScannerPageComponent } from './pages/qr-code-scanner-page/qr-code-scanner-page.component';

const routes: Routes = [
    //Promeniti kada se doda login da se umesto logina ispise ime usera i onda da se ide na profil usera
    //Zameniti companies sa profile a komponentu promeniti u zavisnosti od role ulogovanog korisnika
    {path: 'companies', component: ShowCompaniesComponent},
    {path: 'equipment', component: EquipmentPageComponent},
    {path: 'mycompany', component: CompanyAdminProfilPageComponent},
    {path: 'api/user/companies', component: ShowCompaniesComponent},
    {path: 'profile', component: UserProfileComponent},
    {path: 'update-profile', component: UpdateUserProfileComponent},
    {path: '', component: LandingPageComponent},  
    {path: 'logIn',component:LogInFormComponent},
    {path: 'register',component:RegisterFormComponent},
    {path: 'company/:id',component:VisitCompanyPageComponent},
    {path: 'complaints', component:ComplaintsPageComponent},
    {path: 'profile/upcoming-appoitments', component:UpcomingAppointmentsComponent},
    {path: 'qr-code-scanner', component: QrCodeScannerPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [CreateCompanyFormComponent, SystemAdminProfilePageComponent, LandingPageComponent,LogInFormComponent]
