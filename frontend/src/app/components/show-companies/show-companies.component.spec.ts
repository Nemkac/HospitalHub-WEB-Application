import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCompaniesComponent } from './show-companies.component';

describe('ShowCompaniesComponent', () => {
  let component: ShowCompaniesComponent;
  let fixture: ComponentFixture<ShowCompaniesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCompaniesComponent]
    });
    fixture = TestBed.createComponent(ShowCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
