package HospitalHub.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "SystemAdministrators")
public class SystemAdministrator{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer sysAdminId;

    @OneToOne
    private User user;

    public SystemAdministrator() {

    }

    public SystemAdministrator(User user) {
        this.user = user;
    }
    
    public SystemAdministrator(String name, String lastName, String password, LocalDate dateOfBirth, String email, String phoneNumber, String country, String city, String profession, String companyInfo, Integer sysAdminId) {
        super(email,name, lastName, password, dateOfBirth, email, phoneNumber, country, city, profession, companyInfo);
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getSysAdminId() {
        return sysAdminId;
    }

    public void setSysAdminId(Integer sysAdminId) {
    
        this.sysAdminId = sysAdminId;
    }
}
