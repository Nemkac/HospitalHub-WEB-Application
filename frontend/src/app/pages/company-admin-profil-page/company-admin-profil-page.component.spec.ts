import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminProfilPageComponent } from './company-admin-profil-page.component';

describe('CompanyAdminProfilPageComponent', () => {
  let component: CompanyAdminProfilPageComponent;
  let fixture: ComponentFixture<CompanyAdminProfilPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyAdminProfilPageComponent]
    });
    fixture = TestBed.createComponent(CompanyAdminProfilPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
