import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeScannerPageComponent } from './qr-code-scanner-page.component';

describe('QrCodeScannerPageComponent', () => {
  let component: QrCodeScannerPageComponent;
  let fixture: ComponentFixture<QrCodeScannerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodeScannerPageComponent]
    });
    fixture = TestBed.createComponent(QrCodeScannerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
