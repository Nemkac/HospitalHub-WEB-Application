import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contract } from '../models/Contract';


@Injectable({
    providedIn: 'root'
  })
export class ContractService{
    private apiServerUrl = 'http://localhost:8081';

    constructor(private http:HttpClient){}

    public createContract(contract:Contract,companyId:number,userId:number){
        return this.http.post<Contract>(`${this.apiServerUrl}/api/contract/create/${companyId}/${userId}`,contract);
    }

    public getUsersContracts(userId:number){
        return this.http.get<Contract[]>(`${this.apiServerUrl}/api/contract/contractsByUser/${userId}`);
    }

    public getContractsByCompany(companyId:number){
        return this.http.get<Contract[]>(`${this.apiServerUrl}/api/contract/contractsbyCompany/${companyId}`);
    }

    public cancelContract(contractId:number){
        return this.http.put<Contract>(`${this.apiServerUrl}/api/contract/deactivate/${contractId}`,null);
    }
 


}

