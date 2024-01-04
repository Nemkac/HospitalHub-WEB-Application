package HospitalHub.demo.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.time.LocalTime;
import java.util.ArrayList;
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

    @Column(name = "address")
    private String address;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "avgRate")
    private Double avgRate;

    @Column(name = "description")
    private String description;

    @Column(name = "openingTime")
    private LocalTime openingTime;

    @Column(name = "closingTime")
    private LocalTime closingTime;

    @OneToMany(mappedBy = "company")
    private List<CompanyAdministrator> companyAdministrators;

    @JsonIgnoreProperties("company")
    @OneToMany(mappedBy = "company")
    private List<MedicalEquipment> medicalEquipmentList;

    @OneToMany(mappedBy = "company")
    private List<EquipmentAvailability> equipmentAvailabilityList;

    public Company() {

    }

    public Company(String name, String city, String country, String description) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.description = description;
        this.avgRate = 0.0;
        this.companyAdministrators = new ArrayList<>();
    }

    public Company(Integer id, String name, String city, String country, String address, double latitude, double longitude, String description, LocalTime openingTime, LocalTime closingTime) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.avgRate = 0.0;
        this.description = description;
        this.companyAdministrators = new ArrayList<>();
        this.openingTime = openingTime;
        this.closingTime = closingTime;
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
    public List<EquipmentAvailability> getEquipmentAvailabilityList() {
        return equipmentAvailabilityList;
    }

    public void setEquipmentAvailabilityList(List<EquipmentAvailability> equipmentAvailabilityList) {
        this.equipmentAvailabilityList = equipmentAvailabilityList;
    }

    public List<CompanyAdministrator> getCompanyAdministrator() {
        return companyAdministrators;
    }

    public void setCompanyAdministrator(List<CompanyAdministrator> companyAdministrator) {
        this.companyAdministrators = companyAdministrator;
    }

    public List<CompanyAdministrator> getCompanyAdministrators() {
        return companyAdministrators;
    }

    public void setCompanyAdministrators(List<CompanyAdministrator> companyAdministrators) {
        this.companyAdministrators = companyAdministrators;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalTime getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(LocalTime openingTime) {
        this.openingTime = openingTime;
    }

    public LocalTime getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(LocalTime closingTime) {
        this.closingTime = closingTime;
    }

}
