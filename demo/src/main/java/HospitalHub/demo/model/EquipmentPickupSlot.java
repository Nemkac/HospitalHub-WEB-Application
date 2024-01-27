package HospitalHub.demo.model;

import HospitalHub.demo.dto.EquipmentPickupSlotDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class EquipmentPickupSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "dateAndTime")
    private LocalDateTime dateTime;

    @Column(name = "durationInMinutes")
    private Integer duration;

    @Version
    private Long version;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnoreProperties("equipmentPickupSlots")
    private User reservedBy;

    @ManyToOne
    @JoinColumn(name = "compAdminId")
    @JsonIgnoreProperties("equipmentPickupSlots")
    private CompanyAdministrator companyAdministrator;

    @Column(name = "orderedEquipment")
    //@JsonIgnoreProperties("equipmentPickupSlots")
    private int[] equipment;

    public enum Status {
        ACTIVE, PICKED_UP, EXPIRED
    }

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    public EquipmentPickupSlot(){}

    public EquipmentPickupSlot(LocalDateTime dateTime, Integer duration, CompanyAdministrator companyAdministrator) {
        this.dateTime = dateTime;
        this.duration = duration;
        this.companyAdministrator = companyAdministrator;
    }

    public EquipmentPickupSlot(LocalDateTime dateTime, Integer duration, User reservedBy, CompanyAdministrator companyAdministrator, int[] equipment) {
        this.dateTime = dateTime;
        this.duration = duration;
        this.reservedBy = reservedBy;
        this.companyAdministrator = companyAdministrator;
        this.equipment = equipment;
    }

    
    public EquipmentPickupSlot(LocalDateTime dateTime, Integer duration, User user) {
        this.dateTime = dateTime;
        this.duration = duration;
        this.reservedBy = user;
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


    public CompanyAdministrator getCompanyAdministrator() {
        return companyAdministrator;
    }

    public void setCompanyAdministrator(CompanyAdministrator companyAdministrator) {
        this.companyAdministrator = companyAdministrator;
    }

    public User getReservedBy() {
        return reservedBy;
    }

    public void setReservedBy(User reservedBy) {
        this.reservedBy = reservedBy;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public int[] getEquipment() {
        return equipment;
    }

    public void setEquipment(int[] equipment) {
        this.equipment = equipment;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}

