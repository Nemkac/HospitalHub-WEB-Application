import { CompanyAdministrator } from "./CompanyAdministrator";

export interface EquipmentPickupSlot{
    id: number;
    dateTime: Date;
    duration: number;
    companyAdministrator: CompanyAdministrator;
}