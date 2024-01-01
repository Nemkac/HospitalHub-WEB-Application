import { Component } from '@angular/core';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-qr-code-scanner-page',
  templateUrl: './qr-code-scanner-page.component.html',
})
export class QrCodeScannerPageComponent {
  scanResult: any = '';
  openScanner: boolean = false;
  expired: boolean = false;

  appointmentId: number = 0;
  userName: string = '';
  orderedEquipment: string[] = [];
  orderDate: string = '';
  orderTime: string = '';
  appointmentDuration: number = 0;
  endTime: string = '';

  faQrcode = faQrcode

  public onCodeResult(result:string){
    this.scanResult = result;
    console.log(this.scanResult);
    const resultParts = result.split('\n');

    this.appointmentId = parseInt(resultParts[0]);
    this.userName = resultParts[1];
    this.orderedEquipment = resultParts[2].split(', ').filter(equipment => equipment.trim() !== '');
    const dateTimeParts = resultParts[3].split('T');
    this.orderDate = dateTimeParts[0];
    this.orderTime = dateTimeParts[1];
    this.appointmentDuration = parseInt(resultParts[4]);

    const [hours, minutes] = this.orderTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + this.appointmentDuration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;

    this.endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;

    const currentDate = new Date();
    const orderDateTime = new Date(this.orderDate + 'T' + this.orderTime);
    const orderEndTime = new Date(this.orderDate + 'T' + this.endTime);

    if (orderDateTime < currentDate) {
      this.expired = true;
    } else if (orderDateTime > currentDate) {
      this.expired = false;
    } else {
      this.expired = orderEndTime < currentDate;
    }

  }

  public openQRCodeScanner(): void{
    this.openScanner = true;
  }

  public closeQRCodeScanner(): void{
    this.openScanner = false;
  }

  public scanAnotherQrCode(): void{
    this.scanResult = '';
    this.expired = false;

    this.appointmentId = 0;
    this.userName = '';
    this.orderedEquipment = [];
    this.orderDate = '';
    this.orderTime = '';
    this. appointmentDuration = 0;
    this.endTime = '';
  }

}
