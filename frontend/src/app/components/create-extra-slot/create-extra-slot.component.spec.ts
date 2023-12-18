import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExtraSlotComponent } from './create-extra-slot.component';

describe('CreateExtraSlotComponent', () => {
  let component: CreateExtraSlotComponent;
  let fixture: ComponentFixture<CreateExtraSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateExtraSlotComponent]
    });
    fixture = TestBed.createComponent(CreateExtraSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
