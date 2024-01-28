import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contract } from 'src/app/models/Contract';
import { ContractService } from 'src/app/services/contract.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
})
export class CreateContractComponent implements OnInit{
  equipmentType !: string;
  quantity !: number;
  deliveryDate !: Date;
  token = localStorage.getItem('token');
  userId !: number;
  companyId !: number;

  equipmentTypeUpdate !: string;
  quantityUpdate !: number;
  deliveryDateUpdate !: Date;

  constructor( private contractService : ContractService,
               private userService : UserService ){}

  ngOnInit():void{
    if(this.token){
      this.userService.getUserByToken(this.token).subscribe(
        (user) => {
          this.userId = user.id;
        }
      )
    }
}


  createContract(contract:NgForm){
    console.log(contract.value);
    this.contractService.createContract(contract.value,this.companyId,this.userId).subscribe(
      (response:Contract) => {
        console.log("Vracen contract: ",response);
      }
    )
  }

  updateContract(contract:NgForm){
    console.log(contract.value);

  }

  cancelContract(){

  }


}
