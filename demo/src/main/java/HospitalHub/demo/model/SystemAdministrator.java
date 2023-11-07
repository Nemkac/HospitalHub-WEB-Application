package HospitalHub.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "SystemAdministrators")
public class SystemAdministrator extends User {

    @Column(name = "sysAdminId")
    private Integer sysAdminId;

    public SystemAdministrator() {

    }

    public SystemAdministrator(String name, String lastName, String password, LocalDate dateOfBirth, String email, String phoneNumber, String country, String city, String profession, String companyInfo, Integer sysAdminId) {
        super(name, lastName, password, dateOfBirth, email, phoneNumber, country, city, profession, companyInfo);
        this.sysAdminId = sysAdminId;
    }
}
