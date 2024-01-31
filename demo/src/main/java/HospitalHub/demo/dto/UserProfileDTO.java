package HospitalHub.demo.dto;

import HospitalHub.demo.model.User;

import java.time.LocalDate;

public class UserProfileDTO {
    private String name;
    private String lastName;
    private String password;
    private LocalDate dateOfBirth;
    private String email;
    private String phoneNumber;
    private String country;
    private String city;
    private String profession;
    private Integer penaltyPoints;
    private String companyInfo;

    public UserProfileDTO() {

    }

    public UserProfileDTO(String name, String lastName, String password, LocalDate dateOfBirth, String email, String phoneNumber, String country, String city, String profession, Integer penaltyPoints, String companyInfo) {
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.country = country;
        this.city = city;
        this.profession = profession;
        this.penaltyPoints = penaltyPoints;
        this.companyInfo = companyInfo;
    }

    public UserProfileDTO(User user){
        this.name = user.getName();
        this.lastName = user.getLastName();
        this.password = user.getPassword();
        this.dateOfBirth = user.getDateOfBirth();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
        this.country = user.getCountry();
        this.city = user.getCity();
        this.profession = user.getProfession();
        this.companyInfo = user.getCompanyInfo();
        this.penaltyPoints = user.getPenaltyPoints(); // izmeniti kasnije da kupi iz baze da ga jebem nmp ili da poziva servis neki odma
    }

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPassword() {
        return password;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getCountry() {
        return country;
    }

    public String getCity() {
        return city;
    }

    public String getProfession() {
        return profession;
    }
    public String getCompanyInfo() {
        return companyInfo;
    }

    public Integer getPenaltyPoints() {
        return penaltyPoints;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setCompanyInfo(String companyInfo) {
        this.companyInfo = companyInfo;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public void setPenaltyPoints(Integer penaltyPoints) {
        this.penaltyPoints = penaltyPoints;
    }
}
