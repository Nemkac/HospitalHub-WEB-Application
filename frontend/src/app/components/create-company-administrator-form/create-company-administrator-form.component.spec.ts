import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyAdministratorFormComponent } from './create-company-administrator-form.component';

describe('CreateCompanyAdministratorFormComponent', () => {
  let component: CreateCompanyAdministratorFormComponent;
  let fixture: ComponentFixture<CreateCompanyAdministratorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompanyAdministratorFormComponent]
    });
    fixture = TestBed.createComponent(CreateCompanyAdministratorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
