package HospitalHub.demo.dto;

import HospitalHub.demo.model.Company;


public class CompanyDTO {
    private Integer id;
    private String name;
    private String city;
    private String country;
    private Double avgRate;

    public  CompanyDTO() {
    }

    public CompanyDTO(Company company){
        this(company.getName(), company.getCity(), company.getCountry());
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
