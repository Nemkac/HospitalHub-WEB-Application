import { CompanyAdministrator } from "./CompanyAdministrator";
import { User } from "src/user";

export interface EquipmentPickupSlotDTO{
    id: number;
    dateTime: Date;
    duration: number;
    reservedBy: User;
    companyAdministrator: CompanyAdministrator;
    equipment: number[]; 
    status: string;
    version: number;
    companyId: number;
}