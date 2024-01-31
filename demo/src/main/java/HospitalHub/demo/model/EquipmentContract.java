package HospitalHub.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;


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

    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    @Column(name = "deliveryDate")
    private LocalDate deliveryDate;
    @Column(name = "active")
    private boolean active;
    private boolean deliveryPossible;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;



    public EquipmentContract() {
    }

    public EquipmentContract(Integer id, String equipmentType, int quantity, LocalDate deliveryDate, boolean active, Company company) {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

