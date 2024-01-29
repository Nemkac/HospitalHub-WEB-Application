import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contract } from 'src/app/models/Contract';
import { ContractService } from 'src/app/services/contract.service';
import { CreateContractComponent } from '../create-contract/create-contract.component';

@Component({
  selector: 'app-users-contracts',
  templateUrl: './users-contracts.component.html'
})
export class UsersContractsComponent implements OnInit{

  contracts : Contract[] = [];
  userId !: number;
  
  constructor(
    private modalServiceChild : NgbActiveModal,
    private contractService : ContractService,
    private modalServiceParent: NgbModal

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
        this.modalServiceChild.close();
      }
    )
  }

  updateContract(companyId:number){
    this.modalServiceChild.close();
    const modalRef = this.modalServiceParent.open(
      CreateContractComponent,
      {backdrop:'static',keyboard:true}
    );
    modalRef.componentInstance.companyId = companyId;
  }

  
}
