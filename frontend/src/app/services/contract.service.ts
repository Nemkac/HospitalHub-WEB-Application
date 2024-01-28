import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contract } from '../models/Contract';


@Injectable({
    providedIn: 'root'
  })
export class ContractService{
    private apiServerUrl = 'http://localhost:8081';

    constructor(private http:HttpClient){}

    public createContract(contract:Contract){
        return this.http.post<Contract>(`${this.apiServerUrl}/api/contract/create/1`,contract);
    }
 


}

