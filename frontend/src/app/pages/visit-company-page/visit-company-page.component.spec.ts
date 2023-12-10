import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitCompanyPageComponent } from './visit-company-page.component';

describe('VisitCompanyPageComponent', () => {
  let component: VisitCompanyPageComponent;
  let fixture: ComponentFixture<VisitCompanyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitCompanyPageComponent]
    });
    fixture = TestBed.createComponent(VisitCompanyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
