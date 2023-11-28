import { SearchEquipmentDTO } from 'src/SearchEquipmentDTO';
import { Equipment } from './../../Equipment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EquipmentService {
    private apiServerUrl = 'http://localhost:8081';

    constructor(private http: HttpClient) {}

    public getEquipment() : Observable<Equipment[]> {
        return this.http.get<Equipment[]>(`${this.apiServerUrl}/api/equipment/getAll`);
    }

    public getEquipmentByCombinedSearching(name: string, minPrice: number, maxPrice: number, type: string) : Observable<SearchEquipmentDTO>{
        return this.http.get<SearchEquipmentDTO>(`${this.apiServerUrl}/api/equipment/combinedSearch?name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}&type=${type}`);
    }
}