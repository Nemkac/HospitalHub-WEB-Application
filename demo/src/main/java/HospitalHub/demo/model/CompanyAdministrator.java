package HospitalHub.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "CompanyAdministrator")
public class CompanyAdministrator{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer compAdminId;

    @OneToOne
    private User user;

    @OneToOne
    @JoinColumn(name = "company_id") // Use the name of the foreign key column in the database
    private Company company;

    public CompanyAdministrator() {
    }

    public CompanyAdministrator(User user) {
        this.user = user;
        this.company = null;
    }

    public CompanyAdministrator(User user, Company company) {
        this.user = user;
        this.company = company;
    }

    public CompanyAdministrator(String name, String lastName, String password, LocalDate dateOfBirth, String email, String phoneNumber, String country, String city, String profession, String companyInfo, Integer compAdminId) {
        super(email,name, lastName, password, dateOfBirth, email, phoneNumber, country, city, profession, companyInfo);
        this.compAdminId = compAdminId;
    }

    public Integer getCompAdminId() {
        return compAdminId;
    }

    public void setCompAdminId(Integer compAdminId) {
   
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
