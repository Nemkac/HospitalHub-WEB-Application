import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyFormComponent } from './create-company-form.component';

describe('CreateCompanyFormComponent', () => {
  let component: CreateCompanyFormComponent;
  let fixture: ComponentFixture<CreateCompanyFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompanyFormComponent]
    });
    fixture = TestBed.createComponent(CreateCompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
