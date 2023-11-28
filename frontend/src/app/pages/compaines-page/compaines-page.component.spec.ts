import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompainesPageComponent } from './compaines-page.component';

describe('CompainesPageComponent', () => {
  let component: CompainesPageComponent;
  let fixture: ComponentFixture<CompainesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompainesPageComponent]
    });
    fixture = TestBed.createComponent(CompainesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
