import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSysAdmninistratorFormComponent } from './create-new-sys-admninistrator-form.component';

describe('CreateNewSysAdmninistratorFormComponent', () => {
  let component: CreateNewSysAdmninistratorFormComponent;
  let fixture: ComponentFixture<CreateNewSysAdmninistratorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewSysAdmninistratorFormComponent]
    });
    fixture = TestBed.createComponent(CreateNewSysAdmninistratorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
