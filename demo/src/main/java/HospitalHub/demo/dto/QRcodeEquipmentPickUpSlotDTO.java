package HospitalHub.demo.dto;

import HospitalHub.demo.model.EquipmentPickupSlot;
import HospitalHub.demo.service.EquipmentPickupSlotService;

public class QRcodeEquipmentPickUpSlotDTO {

    private Integer id;
    private String companyName;
    private String equipments;
    private String adminName;
    private String combined;

    public QRcodeEquipmentPickUpSlotDTO(){}
    public QRcodeEquipmentPickUpSlotDTO(EquipmentPickupSlot slot,EquipmentPickupSlotService equipmentPickupSlotService){
        this.id = slot.getId();
        this.companyName = slot.getCompanyAdministrator().getCompany().getName();
        String company = slot.getCompanyAdministrator().getCompany().getName();
        this.equipments = equipmentPickupSlotService.getEquipmentsFromIdsViaString(slot.getEquipment());
        String eq = equipmentPickupSlotService.getEquipmentsFromIdsViaString(slot.getEquipment());
        this.adminName = slot.getCompanyAdministrator().getUser().getName() + " " + slot.getCompanyAdministrator().getUser().getLastName();
        String admin = slot.getCompanyAdministrator().getUser().getName() + " " + slot.getCompanyAdministrator().getUser().getLastName();
        this.combined = "Company˸ " + company  + ". Equipment: " + eq + ". Company admin: " + admin;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getEquipments() {
        return equipments;
    }

    public void setEquipments(String equipments) {
        this.equipments = equipments;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getCombined() {
        return combined;
    }

    public void setCombined(String combined) {
        this.combined = combined;
    }
}
