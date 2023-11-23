import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestemonialsPageComponent } from './testemonials-page.component';

describe('TestemonialsPageComponent', () => {
  let component: TestemonialsPageComponent;
  let fixture: ComponentFixture<TestemonialsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestemonialsPageComponent]
    });
    fixture = TestBed.createComponent(TestemonialsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
