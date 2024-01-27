import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EquipmentPickupSlot } from '../models/EquipmentPickupSlot';
import { Observable } from 'rxjs';
import { Equipment } from 'src/Equipment';
import { UserDTO } from '../userDTO';
import { List } from 'postcss/lib/list';
import { CancellAppointmentDTO } from '../models/CancellAppointmentDTO';

@Injectable({
  providedIn: 'root'
})
export class EquipmentPickupSlotService {
  private apiServerUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  public getAdminsSlots(id: number) : Observable<EquipmentPickupSlot[]>{
    return this.http.get<EquipmentPickupSlot[]>(`${this.apiServerUrl}/api/companyAdmin/getSlots/${id}`);
  }

  public addNewSlot(newSlot: EquipmentPickupSlot, userId: number): Observable<EquipmentPickupSlot> {
    const url = `${this.apiServerUrl}/api/slots/createPredefinedSlot/${userId}`;
    return this.http.post<EquipmentPickupSlot>(url, newSlot);
  } 

  public getSlotById(id : number) : Observable<EquipmentPickupSlot>{
    return this.http.get<EquipmentPickupSlot>(`${this.apiServerUrl}/api/slots/getById/${id}`)
  }

  public addExtraSlot(companyId : Number, slot : EquipmentPickupSlot, userId : Number) : Observable<EquipmentPickupSlot>{
    return this.http.post<EquipmentPickupSlot>(`${this.apiServerUrl}/api/slots/saveExtraSlot/${companyId}/${userId}`,slot);
  }

  public addTestSlot(slot:EquipmentPickupSlot) : Observable<EquipmentPickupSlot>{
    return this.http.post<EquipmentPickupSlot>(`${this.apiServerUrl}/api/slots/saveTestSlot`,slot);
  }
  
  public addExtraSlot1(companyId : Number, date:Date, userId : Number) : Observable<EquipmentPickupSlot>{
    return this.http.post<EquipmentPickupSlot>(`${this.apiServerUrl}/api/slots/saveExtraSlot/${companyId}/${userId}`,date);
  }

  public getSlotsEquipment(slotId:Number) : Observable<Equipment[]>{
    return this.http.get<Equipment[]>(`${this.apiServerUrl}/api/slots/getEquipment/${slotId}`);
  }

  public getReservedUsers(userId: number): Observable<UserDTO[]> {
    const url = `${this.apiServerUrl}/api/slots/getReservedUsers/${userId}`;
    return this.http.get<UserDTO[]>(url);
  }

  public markEquipmentPickedUp(slotId: number): Observable<any> {
    const url = `${this.apiServerUrl}/api/slots/markEquipmentPickedUp/${slotId}`;
    return this.http.patch(url, null);
  }

  public makeSlotExpired(slotId: number) : Observable<EquipmentPickupSlot>{
    return this.http.put<EquipmentPickupSlot>(`${this.apiServerUrl}/api/slots/makeSlotExpired`, slotId);
  }

  public deliverEquipment(slotId: number | undefined, version: number | undefined) : Observable<EquipmentPickupSlot>{
    return this.http.put<EquipmentPickupSlot>(`${this.apiServerUrl}/api/slots/deliverEquipment?version=${version}`, slotId);
  }
 /* public updateStatusForExpiredSlots(): Observable<EquipmentPickupSlot[]> {
    const url = `${this.apiServerUrl}/api/slots/updateStatusForExpiredSlots`;
    return this.http.patch<EquipmentPickupSlot[]>(url, null);
  }*/
  public cancelAppointment(cancellAppointmentDTO:CancellAppointmentDTO,headers:HttpHeaders) : Observable<CancellAppointmentDTO>{
    console.log(cancellAppointmentDTO);
    return this.http.post<CancellAppointmentDTO>(`${this.apiServerUrl}/api/equipment/cancelAppointment`,cancellAppointmentDTO,{headers:headers});
  }

}
