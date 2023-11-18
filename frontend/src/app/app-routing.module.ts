import { EquipmentPageComponent } from './pages/equipment-page/equipment-page.component';
import { SystemAdminProfilePageComponent } from './pages/system-admin-profile-page/system-admin-profile-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CreateCompanyFormComponent } from './components/create-company-form/create-company-form.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyAdminProfilPageComponent } from './pages/company-admin-profil-page/company-admin-profil-page.component';

const routes: Routes = [
    //Promeniti kada se doda login da se umesto logina ispise ime usera i onda da se ide na profil usera
    //Zameniti companies sa profile a komponentu promeniti u zavisnosti od role ulogovanog korisnika
    {path: 'companies', component: SystemAdminProfilePageComponent},
    {path: '', component: LandingPageComponent},
    {path: 'equipment', component: EquipmentPageComponent},
    {path: 'mycompany', component: CompanyAdminProfilPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [CreateCompanyFormComponent, SystemAdminProfilePageComponent, LandingPageComponent]