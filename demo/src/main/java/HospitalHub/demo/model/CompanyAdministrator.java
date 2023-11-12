package HospitalHub.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "CompanyAdministrator")
public class CompanyAdministrator extends User{

    @Column(name = "compAdminId")
    private Integer compAdminId;

    @OneToOne(mappedBy = "companyAdministrator", cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "company_id") // Use the name of the foreign key column in the database
    private Company company;
    //Treba dodati polje sa relacijom koje ce predstavljati id kompanije za koju je admin zaduzen
    //Company company

    public CompanyAdministrator() {
    }
    public CompanyAdministrator(String name, String lastName, String password, LocalDate dateOfBirth, String email, String phoneNumber, String country, String city, String profession, String companyInfo, Integer compAdminId) {
        super(name, lastName, password, dateOfBirth, email, phoneNumber, country, city, profession, companyInfo);
        this.compAdminId = compAdminId;
        this.company = null;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
