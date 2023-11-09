package HospitalHub.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "CompanyAdministrator")
public class CompanyAdministrator extends User{

   @Column(name = "compAdminId")
   private Integer compAdminId;

   public CompanyAdministrator() {
   }
    public CompanyAdministrator(String name, String lastName, String password, LocalDate dateOfBirth, String email, String phoneNumber, String country, String city, String profession, String companyInfo, Integer compAdminId) {
        super(name, lastName, password, dateOfBirth, email, phoneNumber, country, city, profession, companyInfo);
        this.compAdminId = compAdminId;
    }

}
