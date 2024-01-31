import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDeliveryPageComponent } from './request-delivery-page.component';

describe('RequestDeliveryPageComponent', () => {
  let component: RequestDeliveryPageComponent;
  let fixture: ComponentFixture<RequestDeliveryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestDeliveryPageComponent]
    });
    fixture = TestBed.createComponent(RequestDeliveryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
