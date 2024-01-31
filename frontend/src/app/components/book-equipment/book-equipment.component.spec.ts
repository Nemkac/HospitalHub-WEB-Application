import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEquipmentComponent } from './book-equipment.component';

describe('BookEquipmentComponent', () => {
  let component: BookEquipmentComponent;
  let fixture: ComponentFixture<BookEquipmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookEquipmentComponent]
    });
    fixture = TestBed.createComponent(BookEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
