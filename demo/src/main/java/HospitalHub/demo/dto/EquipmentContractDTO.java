package HospitalHub.demo.dto;

import java.time.LocalDate;

public class EquipmentContractDTO{
        private Integer id;
        private String equipmentType;
        private int quantity;
        private LocalDate deliveryDate;
        private boolean active;
        private CompanyDTO company;

    public EquipmentContractDTO() {
    }

    public EquipmentContractDTO(Integer id, String equipmentType, int quantity, LocalDate deliveryDate, boolean active, CompanyDTO company) {
        this.id = id;
        this.equipmentType = equipmentType;
        this.quantity = quantity;
        this.deliveryDate = deliveryDate;
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

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
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

