package HospitalHub.demo.dto;

import HospitalHub.demo.model.EquipmentContract;
import HospitalHub.demo.service.EquipmentContractService;
import org.springframework.beans.factory.annotation.Autowired;

import java.awt.*;
import java.time.LocalDate;
import java.util.Date;

public class ContractDTO {
    private Integer id;
    private String companyName;
    private String equipmentType;
    private Integer quantity;
    private LocalDate deliveryDate;

    public ContractDTO(){}
    private EquipmentContractService equipmentContractService;

    public ContractDTO(Integer id, String companyName, String equipmentType, Integer quantity, LocalDate deliveryDate) {
        this.id = id;
        this.companyName = companyName;
        this.equipmentType = equipmentType;
        this.quantity = quantity;
        this.deliveryDate = deliveryDate;
    }

    public ContractDTO(EquipmentContract contract){
        this.id = contract.getId();
        this.companyName = contract.getCompany().getName();
        this.equipmentType = contract.getEquipmentType();
        this.quantity = contract.getQuantity();
        this.deliveryDate = contract.getDeliveryDate();
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

    public String getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentType(String equipmentType) {
        this.equipmentType = equipmentType;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
    }
}
