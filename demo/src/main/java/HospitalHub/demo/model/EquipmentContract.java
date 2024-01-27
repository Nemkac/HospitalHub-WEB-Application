package HospitalHub.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class EquipmentContract {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "equipmentType")
    private String equipmentType;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "deliveryDateTime")
    private LocalDate deliveryDate;
    @Column(name = "active")
    private boolean active;
    private boolean deliveryPossible;

    private String serializedDeliveryDate;


    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    public EquipmentContract() {
    }

    public EquipmentContract(Integer id, String equipmentType, int quantity, LocalDateTime deliveryDateTime, boolean active, Company company) {
        this.id = id;
        this.equipmentType = equipmentType;
        this.quantity = quantity;
        this.deliveryDate = deliveryDate;
        this.active = active;
        this.company = company;
    }

    public EquipmentContract(Integer id, String equipmentType, int quantity, LocalDate deliveryDate, boolean active, boolean deliveryPossible, Company company) {
        this.id = id;
        this.equipmentType = equipmentType;
        this.quantity = quantity;
        this.deliveryDate = deliveryDate;
        this.active = active;
        this.deliveryPossible = deliveryPossible;
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

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public boolean isDeliveryPossible() {
        return deliveryPossible;
    }

    public void setDeliveryPossible(boolean deliveryPossible) {
        this.deliveryPossible = deliveryPossible;
    }

    public String getSerializedDeliveryDate() {
        return serializedDeliveryDate;
    }

    public void setSerializedDeliveryDate(String serializedDeliveryDate) {
        this.serializedDeliveryDate = serializedDeliveryDate;
    }
}

