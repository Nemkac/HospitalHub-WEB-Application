package HospitalHub.demo.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.List;
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name")
    private String name;
    @Column(name = "city")
    private String city;
    @Column(name = "country")
    private String country;
    @Column(name = "avgRate")
    private Double avgRate;

    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "company_admin_id") // Use the name of the foreign key column in the database
    private CompanyAdministrator companyAdministrator;

    @JsonIgnoreProperties("company")
    @OneToMany(mappedBy = "company")
    private List<MedicalEquipment> medicalEquipmentList;

    /*Treba dodati polje sa relacijom koje ce predstavljati id administratora
    koji je zaduzen za odredjenu kompaniju.*/
    //CompanyAdministrator companyAdministrator

    public Company() {

    }

    public Company(String name, String city, String country) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.avgRate = 0.0;
        this.companyAdministrator = null;
    }

    public Company(Integer id, String name, String city, String country) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.avgRate = 0.0;
        this.companyAdministrator = null;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Double getAvgRate() {
        return avgRate;
    }

    public void setAvgRate(Double avgRate) {
        this.avgRate = avgRate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<MedicalEquipment> getMedicalEquipmentList() {
        return medicalEquipmentList;
    }

    public void setMedicalEquipmentList(List<MedicalEquipment> medicalEquipmentList) {
        this.medicalEquipmentList = medicalEquipmentList;
    }

    public CompanyAdministrator getCompanyAdministrator() {
        return companyAdministrator;
    }

    public void setCompanyAdministrator(CompanyAdministrator companyAdministrator) {
        this.companyAdministrator = companyAdministrator;
    }
}
