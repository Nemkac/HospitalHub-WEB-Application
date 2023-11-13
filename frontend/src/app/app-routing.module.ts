import { CompanyAdminProfilePageComponent } from './pages/company-admin-profile-page/company-admin-profile-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CreateCompanyFormComponent } from './components/create-company-form/create-company-form.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ShowCompaniesComponent } from './components/show-companies/show-companies.component';

const routes: Routes = [
    //Promeniti kada se doda login da se umesto logina ispise ime usera i onda da se ide na profil usera
    //Zameniti companies sa profile a komponentu promeniti u zavisnosti od role ulogovanog korisnika
    {path: 'companies', component: CompanyAdminProfilePageComponent},
    {path: '', component: LandingPageComponent},
    {path: 'api/user/:id', component: UserProfileComponent},
    {path : 'api/company/getAll', component: ShowCompaniesComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [CreateCompanyFormComponent, CompanyAdminProfilePageComponent, LandingPageComponent]