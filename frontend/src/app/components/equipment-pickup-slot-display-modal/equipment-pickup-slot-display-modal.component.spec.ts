import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentPickupSlotDisplayModalComponent } from './equipment-pickup-slot-display-modal.component';

describe('EquipmentPickupSlotDisplayModalComponent', () => {
  let component: EquipmentPickupSlotDisplayModalComponent;
  let fixture: ComponentFixture<EquipmentPickupSlotDisplayModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentPickupSlotDisplayModalComponent]
    });
    fixture = TestBed.createComponent(EquipmentPickupSlotDisplayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
