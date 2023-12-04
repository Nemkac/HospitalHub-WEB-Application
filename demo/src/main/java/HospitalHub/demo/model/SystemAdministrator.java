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

    @Column
    private boolean passwordChanged;

    public SystemAdministrator() {

    }

    public SystemAdministrator(User user) {
        this.user = user;
        this.passwordChanged = false;
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
        this.passwordChanged = false;
    }
}
