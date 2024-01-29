import { Company } from "src/company";

export interface Contract{
    id:number;
    equipmentType : string;
    quantity : number;
    deliveryDate : Date;
    company : Company;
}