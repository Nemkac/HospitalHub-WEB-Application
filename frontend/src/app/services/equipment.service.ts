import { OrderEquipmentDTO } from './../models/OrderEquipmentDTO';
import { SearchEquipmentDTO } from 'src/SearchEquipmentDTO';
import { Equipment } from './../../Equipment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EquipmentToUpdate } from '../EquipmentToUpdate';
import { O } from '@fullcalendar/core/internal-common';
import { EquipmentPickupSlot } from '../models/EquipmentPickupSlot';

@Injectable({
    providedIn: 'root',
})
export class EquipmentService {
    private apiServerUrl = 'http://localhost:8081';
    private equipmentSubject = new BehaviorSubject<Equipment[]>([]);
    private baseUrl = 'http://localhost:8081/api/equipment';

    constructor(private http: HttpClient) {}

    public getEquipment() : Observable<Equipment[]> {
        return this.http.get<Equipment[]>(`${this.apiServerUrl}/api/equipment/getAll`);
    }

    public getEquipmentByCombinedSearching(name: string, minPrice: number, maxPrice: number, type: string) : Observable<SearchEquipmentDTO>{
        return this.http.get<SearchEquipmentDTO>(`${this.apiServerUrl}/api/equipment/combinedSearch?name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}&type=${type}`);
    }
    
    deleteEquipment(equipmentId: number): Observable<Equipment> {
        return this.http.delete<Equipment>(`${this.apiServerUrl}/api/equipment/deleteEquipment/${equipmentId}`);
    }
  
    updateEquipment(id: number, equipmentToUpdate: EquipmentToUpdate): Observable<any> {
        const url = `${this.baseUrl}/updateEquipment/${id}`;
        return this.http.put(url, equipmentToUpdate);
    }

    getEquipmentById(equipmentId: number,version :number): Observable<Equipment> {
        const url = `${this.baseUrl}/${equipmentId}/${version}`;
        return this.http.get<Equipment>(url);
    }

    addEquipment(equipment: Equipment, companyId: number): Observable<Equipment> {
        const url = `${this.baseUrl}/addEquipment/${companyId}`;
        return this.http.post<Equipment>(url, equipment);
      }

    public getAvailableDaysInFollowinTen(companyId : number) : Observable<Date[]>{
        return this.http.get<Date[]>(`http://localhost:8081/api/company/getAvailableDays/${companyId}`);
    }

    public orderEquipment(order : OrderEquipmentDTO,version:number | undefined) : Observable<EquipmentPickupSlot>{
        return this.http.post<EquipmentPickupSlot>(`${this.apiServerUrl}/api/equipment/orderEquipment?version=${version}`, order);
    }
}