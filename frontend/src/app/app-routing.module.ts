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

const routes: Routes = [
    //Promeniti kada se doda login da se umesto logina ispise ime usera i onda da se ide na profil usera
    //Zameniti companies sa profile a komponentu promeniti u zavisnosti od role ulogovanog korisnika
    {path: 'companies', component: SystemAdminProfilePageComponent},
    {path: 'equipment', component: EquipmentPageComponent},
    {path: 'mycompany', component: CompanyAdminProfilPageComponent},
    {path: 'api/user/updateProfile/:id', component: UpdateUserProfileComponent},
    {path: 'api/user/companies', component: ShowCompaniesComponent},
    {path: 'api/user/profile/:id', component: UserProfileComponent},
    {path: '', component: LandingPageComponent},  
    {path: 'logIn',component:LogInFormComponent},
    {path: 'register',component:RegisterFormComponent},
    {path: 'complaints', component:ComplaintsPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [CreateCompanyFormComponent, SystemAdminProfilePageComponent, LandingPageComponent,LogInFormComponent]
