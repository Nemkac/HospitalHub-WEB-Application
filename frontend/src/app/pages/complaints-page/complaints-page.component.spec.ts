import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsPageComponent } from './complaints-page.component';

describe('NotificationsPageComponent', () => {
  let component: ComplaintsPageComponent;
  let fixture: ComponentFixture<ComplaintsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplaintsPageComponent]
    });
    fixture = TestBed.createComponent(ComplaintsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
