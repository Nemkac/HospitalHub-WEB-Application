import { Component, OnInit } from '@angular/core';
import { Contract } from 'src/app/models/Contract';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-company-contracts',
  templateUrl: './company-contracts.component.html'
})
export class CompanyContractsComponent implements OnInit{

  contracts : Contract[] = [];
  companyId !: number;

  constructor(private contractService : ContractService){}

  ngOnInit(): void {
    this.contractService.getContractsByCompany(this.companyId).subscribe(
      (companyContracts) => {
        this.contracts = companyContracts;
      }
    );
  }

}
