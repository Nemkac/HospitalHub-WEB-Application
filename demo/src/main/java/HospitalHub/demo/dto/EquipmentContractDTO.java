package HospitalHub.demo.dto;

import java.time.LocalDateTime;

public class EquipmentContractDTO{
        private Integer id;
        private String equipmentType;
        private int quantity;
        private LocalDateTime deliveryDateTime;
        private boolean active;
        private CompanyDTO company;

    public EquipmentContractDTO() {
    }

    public EquipmentContractDTO(Integer id, String equipmentType, int quantity, LocalDateTime deliveryDateTime, boolean active, CompanyDTO company) {
        this.id = id;
        this.equipmentType = equipmentType;
        this.quantity = quantity;
        this.deliveryDateTime = deliveryDateTime;
        this.active = active;
        this.company = company;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentType(String equipmentType) {
        this.equipmentType = equipmentType;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDateTime getDeliveryDateTime() {
        return deliveryDateTime;
    }

    public void setDeliveryDateTime(LocalDateTime deliveryDateTime) {
        this.deliveryDateTime = deliveryDateTime;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public CompanyDTO getCompany() {
        return company;
    }

    public void setCompany(CompanyDTO company) {
        this.company = company;
    }
}

