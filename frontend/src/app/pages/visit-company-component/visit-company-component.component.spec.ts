import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitCompanyComponentComponent } from './visit-company-component.component';

describe('VisitCompanyComponentComponent', () => {
  let component: VisitCompanyComponentComponent;
  let fixture: ComponentFixture<VisitCompanyComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitCompanyComponentComponent]
    });
    fixture = TestBed.createComponent(VisitCompanyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
