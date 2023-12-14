import { SearchEquipmentDTO } from 'src/SearchEquipmentDTO';
import { Equipment } from './../../Equipment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EquipmentToUpdate } from '../EquipmentToUpdate';

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
    
    public deleteEquipment(equipmentId: number): Observable<any> {
        return this.http.delete(`${this.apiServerUrl}/api/equipment/deleteEquipment/${equipmentId}`);
      }
  
    updateEquipment(id: number, equipmentToUpdate: EquipmentToUpdate): Observable<any> {
        const url = `${this.baseUrl}/updateEquipment/${id}`;
        return this.http.put(url, equipmentToUpdate);
    }

    getEquipmentById(equipmentId: number): Observable<Equipment> {
        const url = `${this.baseUrl}/${equipmentId}`;
        return this.http.get<Equipment>(url);
      }
}