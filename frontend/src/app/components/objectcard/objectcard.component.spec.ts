import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectcardComponent } from './objectcard.component';

describe('ObjectcardComponent', () => {
  let component: ObjectcardComponent;
  let fixture: ComponentFixture<ObjectcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectcardComponent]
    });
    fixture = TestBed.createComponent(ObjectcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
