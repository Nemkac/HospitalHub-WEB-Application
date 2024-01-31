import { Company } from "src/company";
import { User } from "src/user";
import { EquipmentPickupSlot } from "./EquipmentPickupSlot";

export interface CompanyAdministrator{
    compAdminId: number;
    user: User;
    company: Company;
    equipmentPickupSlots: EquipmentPickupSlot[];
}