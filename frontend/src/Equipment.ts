import { Company } from 'src/company';
export interface Equipment{
    id : number,
    name : string,
    type : string,
    description : string
    company : Company
}