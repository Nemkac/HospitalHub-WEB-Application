import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminProfilePageComponent } from './company-admin-profile-page.component';

describe('CompanyAdminProfilePageComponent', () => {
  let component: CompanyAdminProfilePageComponent;
  let fixture: ComponentFixture<CompanyAdminProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyAdminProfilePageComponent]
    });
    fixture = TestBed.createComponent(CompanyAdminProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
