package HospitalHub.demo.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;


import java.util.List;
import java.util.Objects;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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

    @Column(name = "price")
    private Double price;

    @Column(name = "image")
    private String image;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne
    @JoinColumn(name="company_id")
    private Company company;

    @OneToMany(mappedBy = "medicalEquipment")
    private List<EquipmentAvailability> equipmentAvailabilityList;

    @Column(name = "quantity")
    private Integer quantity;

    @Version
    private Long version;


    public MedicalEquipment() {}

    public MedicalEquipment(String name, String type, String description, Company company, Double price, String image, Integer quantity) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.company = company;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<EquipmentAvailability> getEquipmentAvailabilityList() {
        return equipmentAvailabilityList;
    }

    public void setEquipmentAvailabilityList(List<EquipmentAvailability> equipmentAvailabilityList) {
        this.equipmentAvailabilityList = equipmentAvailabilityList;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        MedicalEquipment other = (MedicalEquipment) obj;
        return Objects.equals(name, other.name) &&
                Objects.equals(type, other.type) &&
                Objects.equals(description, other.description) &&
                Objects.equals(price, other.price);
    }
}
