import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentcardComponent } from './equipmentcard.component';

describe('EquipmentcardComponent', () => {
  let component: EquipmentcardComponent;
  let fixture: ComponentFixture<EquipmentcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentcardComponent]
    });
    fixture = TestBed.createComponent(EquipmentcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
