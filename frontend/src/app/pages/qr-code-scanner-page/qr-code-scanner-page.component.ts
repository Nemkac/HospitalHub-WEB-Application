import { Component, ElementRef, ViewChild } from '@angular/core';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import jsQR from 'jsqr';
import { EquipmentPickupSlotService } from 'src/app/services/equipment-pickup-slot.service';
import { NgToastService } from 'ng-angular-popup'
import { EquipmentPickupSlot } from 'src/app/models/EquipmentPickupSlot';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-qr-code-scanner-page',
  templateUrl: './qr-code-scanner-page.component.html',
})
export class QrCodeScannerPageComponent {
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;
  scanResult: any = '';
  openScanner: boolean = false;
  expired: boolean = false;
  pickedUp: boolean = false;

  appointmentId: number = 0;
  appointmentVersion : number = 0;
  userName: string = '';
  orderedEquipment: string[] = [];
  orderDate: string = '';
  orderTime: string = '';
  appointmentDuration: number = 0;
  endTime: string = '';

  faQrcode = faQrcode

  constructor(private equipmentPickupSlotService : EquipmentPickupSlotService,
              private toast: NgToastService){}

  handleImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        this.scanQRCodeFromImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  uploadQRCode(): void {
    this.scanResult = '';
    this.expired = false;
    this.openScanner = false;

    this.appointmentId = 0;
    this.userName = '';
    this.orderedEquipment = [];
    this.orderDate = '';
    this.orderTime = '';
    this. appointmentDuration = 0;
    this.endTime = '';
    this.fileInput.nativeElement.click();
  }

  scanQRCodeFromImage(imageUrl: string): void {
    const img = new Image();
    img.src = imageUrl;
  
    img.onload = () => {
      if (img.width === 0 || img.height === 0) {
        this.toast.error({detail:"QR Image error.", summary:"Invalid image dimensions."});
        return;
      }
  
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      if (!context) {
        console.error('Canvas context is null.');
        return;
      }
  
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
  
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
  
      if (code) {
        this.onCodeResult(code.data);
      } else {
        this.toast.error({detail:"QR Image error.", summary:"QR code not found in the image."});
      }
    };
  }

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

    this.equipmentPickupSlotService.getSlotById(this.appointmentId).subscribe(
      (response: EquipmentPickupSlot) => {
        if(response.status === "PICKED_UP"){
          this.pickedUp = true;
        } else {
          this.pickedUp = false;
        }
      }
    )

    if(this.expired){
      this.equipmentPickupSlotService.makeSlotExpired(this.appointmentId).subscribe(
        (response:EquipmentPickupSlot) => {
          if(response !== null && response.status !== "EXPIRED"){
            this.toast.info({detail:"System information", summary:"Status updated: EXPIRED"});
          } else {
            this.toast.info({detail:"System information", summary:"Appointment status: EXPIRED"});
          }
        }
      );
    }
  }

  public deliverEquipment(slotId : number) : void{
    this.equipmentPickupSlotService.getSlotById(slotId).subscribe(
      (response: EquipmentPickupSlot) => {
        this.appointmentVersion = response.version;
      }
    )
    this.equipmentPickupSlotService.deliverEquipment(slotId, this.appointmentVersion).subscribe(
      (response:EquipmentPickupSlot) => {
        this.toast.success({detail:"Delivery successful!", summary:"Equipment successfully delivered. Appointment status: PICKED_UP"});
        this.pickedUp = true;
      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Error message", summary:"Error during delivery of equipment!"});
        this.pickedUp = false;
      }
    )
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
