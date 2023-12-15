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

    public  CompanyDTO() {
    }

    public CompanyDTO(Company company){
        this(company.getName(), company.getCity(), company.getCountry());
    }

    public CompanyDTO(Integer id, String name, String city, String country, Double avgRate, String address, Double latitude, Double longitude) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.avgRate = avgRate;
        this.address = address;
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

    public CompanyDTO(String name, String city, String country) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.avgRate = 0.0;
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
}
