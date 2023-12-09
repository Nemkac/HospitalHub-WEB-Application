package HospitalHub.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

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

    @OneToMany(mappedBy = "companyAdministrator")
    private List<EquipmentAvailability> equipmentAvailabilityList;
    @Column
    private boolean passwordChanged;

    public CompanyAdministrator() {
    }

    public CompanyAdministrator(User user) {
        this.user = user;
        this.company = null;
        this.passwordChanged = false;
    }

    public CompanyAdministrator(User user, Company company) {
        this.user = user;
        this.company = company;
        this.passwordChanged = false;
    }
    public Integer getCompAdminId() {
        return compAdminId;
    }

    public void setCompAdminId(Integer compAdminId) {
        this.compAdminId = compAdminId;
    }
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

    public List<EquipmentAvailability> getEquipmentAvailabilityList() {
        return equipmentAvailabilityList;
    }

    public void setEquipmentAvailabilityList(List<EquipmentAvailability> equipmentAvailabilityList) {
        this.equipmentAvailabilityList = equipmentAvailabilityList;
    }

    public void setSysAdminId(Integer compAdminId) {
        this.compAdminId = compAdminId;
        this.passwordChanged = false;
    }

    public boolean isPasswordChanged() {
        return passwordChanged;
    }

    public void setPasswordChanged(boolean passwordChanged) {
        this.passwordChanged = passwordChanged;
    }
}

