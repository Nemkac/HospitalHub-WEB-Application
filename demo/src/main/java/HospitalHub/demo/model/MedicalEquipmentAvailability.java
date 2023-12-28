package HospitalHub.demo.model;

import jakarta.persistence.*;

@Entity
public class MedicalEquipmentAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private MedicalEquipment equipment;

    @Column(name = "quantity")
    private Integer quantity;

    public MedicalEquipmentAvailability(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public MedicalEquipment getEquipment() {
        return equipment;
    }

    public void setEquipment(MedicalEquipment equipment) {
        this.equipment = equipment;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
