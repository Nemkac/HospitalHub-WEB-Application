import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminProfilePageComponent } from './system-admin-profile-page.component';

describe('SystemAdminProfilePageComponent', () => {
  let component: SystemAdminProfilePageComponent;
  let fixture: ComponentFixture<SystemAdminProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemAdminProfilePageComponent]
    });
    fixture = TestBed.createComponent(SystemAdminProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
