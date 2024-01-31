export interface OrderEquipmentDTO{
    equipmentIds : number[];
    companyId : number;
    userId: number;
    pickupSlotId: number;
    versionIds: Map<number,number>;
}