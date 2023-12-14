import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePickupSlotFormComponent } from './create-pickup-slot-form.component';

describe('CreatePickupSlotFormComponent', () => {
  let component: CreatePickupSlotFormComponent;
  let fixture: ComponentFixture<CreatePickupSlotFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePickupSlotFormComponent]
    });
    fixture = TestBed.createComponent(CreatePickupSlotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
