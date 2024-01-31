import { Company } from "src/company";
import { User } from "src/user";

export interface Contract{
    id:number;
    user : User;
    equipmentType : string;
    quantity : number;
    deliveryDate : Date;
    company : Company;
    active : boolean;
}