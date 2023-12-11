import { CompanyAdministrator } from "./CompanyAdministrator";

export interface EquipmentPickupSlot{
    id: number;
    dateTime: string;
    duration: number;
    companyAdministrator: CompanyAdministrator;
}