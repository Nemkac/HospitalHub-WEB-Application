import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contract } from 'src/app/models/Contract';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
})
export class CreateContractComponent implements OnInit{
  equipmentType !: string;
  quantity !: number;
  deliveryDate !: Date;

  equipmentTypeUpdate !: string;
  quantityUpdate !: number;
  deliveryDateUpdate !: Date;

  constructor( private contractService : ContractService ){}

  ngOnInit():void{}


  createContract(contract:NgForm){
    console.log(contract.value);
    this.contractService.createContract(contract.value).subscribe(
      (response:Contract) => {
        console.log("Vracen contract: ",response);
      }
    )
  }

  cancelContract(){

  }


}
