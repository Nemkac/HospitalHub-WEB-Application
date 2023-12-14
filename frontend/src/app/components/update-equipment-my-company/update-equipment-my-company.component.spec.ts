import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEquipmentMyCompanyComponent } from './update-equipment-my-company.component';

describe('UpdateEquipmentMyCompanyComponent', () => {
  let component: UpdateEquipmentMyCompanyComponent;
  let fixture: ComponentFixture<UpdateEquipmentMyCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEquipmentMyCompanyComponent]
    });
    fixture = TestBed.createComponent(UpdateEquipmentMyCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
