import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestemonialCardComponent } from './testemonial-card.component';

describe('TestemonialCardComponent', () => {
  let component: TestemonialCardComponent;
  let fixture: ComponentFixture<TestemonialCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestemonialCardComponent]
    });
    fixture = TestBed.createComponent(TestemonialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
