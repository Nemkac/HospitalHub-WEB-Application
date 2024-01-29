import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contract } from 'src/app/models/Contract';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-users-contracts',
  templateUrl: './users-contracts.component.html'
})
export class UsersContractsComponent implements OnInit{

  contracts : Contract[] = [];
  userId !: number;
  
  constructor(
    private modalService : NgbActiveModal,
    private contractService : ContractService
  ){}

  ngOnInit(): void {
    this.contractService.getUsersContracts(this.userId).subscribe(
      (usersContracts) => {
        this.contracts = usersContracts;
        console.log(usersContracts);
      }
    )
  }

  cancelContract(contractId:number){
    this.contractService.cancelContract(contractId).subscribe(
      (canceledContract) => {
        console.log("Contract canceled");
        this.modalService.close();
      }
    )
  }
  
}
