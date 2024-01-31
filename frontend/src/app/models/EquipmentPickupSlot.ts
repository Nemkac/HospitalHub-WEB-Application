import { CompanyAdministrator } from "./CompanyAdministrator";
import { User } from "src/user";

export interface EquipmentPickupSlot{
    id: number;
    dateTime: Date;
    duration: number;
    reservedBy: User;
    companyAdministrator: CompanyAdministrator;
    equipment: number[]; 
    status: string;
    version: number;
}