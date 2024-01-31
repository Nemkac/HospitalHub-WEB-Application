package HospitalHub.demo.dto;

import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.EquipmentPickupSlot;
import HospitalHub.demo.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;

public class EquipmentPickupSlotDTO {
    private Integer id;
    private LocalDateTime dateTime;
    private Integer duration;
    private User reservedBy;
    private CompanyAdministrator companyAdministrator;
    private EquipmentPickupSlot.Status status;

    public EquipmentPickupSlotDTO() {
    }

    public EquipmentPickupSlotDTO(EquipmentPickupSlot slot){
        this(
            slot.getId(),
            slot.getDateTime(),
            slot.getDuration(),
            slot.getCompanyAdministrator(),
            slot.getStatus()
        );
    }

    public EquipmentPickupSlotDTO(Integer id, LocalDateTime dateTime, Integer duration, CompanyAdministrator companyAdministrator, EquipmentPickupSlot.Status status) {
        this.id = id;
        this.dateTime = dateTime;
        this.duration = duration;
        this.companyAdministrator = companyAdministrator;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public User getReservedBy() {
        return reservedBy;
    }

    public void setReservedBy(User reservedBy) {
        this.reservedBy = reservedBy;
    }

    public CompanyAdministrator getCompanyAdministrator() {
        return companyAdministrator;
    }

    public void setCompanyAdministrator(CompanyAdministrator companyAdministrator) {
        this.companyAdministrator = companyAdministrator;
    }

    public EquipmentPickupSlot.Status getStatus() {
        return status;
    }

    public void setStatus(EquipmentPickupSlot.Status status) {
        this.status = status;
    }
}
