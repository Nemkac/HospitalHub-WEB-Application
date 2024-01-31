import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEquipmentMyCompanyFormComponent } from './add-equipment-my-company-form.component';

describe('AddEquipmentMyCompanyFormComponent', () => {
  let component: AddEquipmentMyCompanyFormComponent;
  let fixture: ComponentFixture<AddEquipmentMyCompanyFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEquipmentMyCompanyFormComponent]
    });
    fixture = TestBed.createComponent(AddEquipmentMyCompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
