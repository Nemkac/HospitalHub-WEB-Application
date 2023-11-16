package HospitalHub.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Equipment")
public class MedicalEquipment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name="company_id", nullable=false)
    private Company company;

    public MedicalEquipment() {}

    public MedicalEquipment(String name, String type, String description, Company company) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.company = company;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
