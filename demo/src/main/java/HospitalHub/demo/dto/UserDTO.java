package HospitalHub.demo.dto;

import HospitalHub.demo.model.User;

import java.time.LocalDate;

public class UserDTO {
    private Integer id;
    private String name;
    private String lastName;
    private String password;
    private LocalDate dateOfBirth;
    private String email;
    private String phoneNumber;
    private String country;
    private String city;
    private String profession;
    private String companyInfo;

    public UserDTO(String name, String lastName, String password, LocalDate dateOfBirth, String email, String phoneNumber, String country, String city, String profession, String companyInfo) {
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.country = country;
        this.city = city;
        this.profession = profession;
        this.companyInfo = companyInfo;
    }

    public UserDTO() {
    }

    public UserDTO(User user){
        this(
                user.getName(),
                user.getLastName(),
                user.getPassword(),
                user.getDateOfBirth(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getCountry(),
                user.getCity(),
                user.getProfession(),
                user.getCompanyInfo()
        );
    }

    public UserDTO(UserDTO userDto) {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getCompanyInfo() {
        return companyInfo;
    }

    public void setCompanyInfo(String companyInfo) {
        this.companyInfo = companyInfo;
    }
}
