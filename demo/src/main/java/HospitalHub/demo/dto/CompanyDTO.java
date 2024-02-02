package HospitalHub.demo.dto;

import HospitalHub.demo.model.Company;
import jakarta.persistence.Column;


public class CompanyDTO {
    private Integer id;
    private String name;
    private String city;
    private String country;
    private Double avgRate;
    private String address;
    private Double latitude;
    private Double longitude;
    private String description;

    public  CompanyDTO() {
    }

    public CompanyDTO(Company company){
        this(company.getName(), company.getCity(), company.getCountry(), company.getDescription(), company.getLatitude(), company.getLongitude());
    }

    public CompanyDTO(String name, String city, String country, Double latitude, Double longitude) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.avgRate = 0.0;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public CompanyDTO(String name, String city, String country, String description, Double latitude, Double longitude) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.avgRate = 0.0;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
