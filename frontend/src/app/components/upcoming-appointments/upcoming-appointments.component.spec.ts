import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAppointmentsComponent } from './upcoming-appointments.component';

describe('UpcomingAppointmentsComponent', () => {
  let component: UpcomingAppointmentsComponent;
  let fixture: ComponentFixture<UpcomingAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingAppointmentsComponent]
    });
    fixture = TestBed.createComponent(UpcomingAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
