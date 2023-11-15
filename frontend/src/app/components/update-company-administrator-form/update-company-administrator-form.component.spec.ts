import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompanyAdministratorFormComponent } from './update-company-administrator-form.component';

describe('UpdateCompanyAdministratorFormComponent', () => {
  let component: UpdateCompanyAdministratorFormComponent;
  let fixture: ComponentFixture<UpdateCompanyAdministratorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCompanyAdministratorFormComponent]
    });
    fixture = TestBed.createComponent(UpdateCompanyAdministratorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
