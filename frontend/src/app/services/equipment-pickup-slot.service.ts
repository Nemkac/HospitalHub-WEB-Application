import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EquipmentPickupSlot } from '../models/EquipmentPickupSlot';
import { Observable } from 'rxjs';

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

}

