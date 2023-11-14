package HospitalHub.demo.dto;

import HospitalHub.demo.model.SystemAdministrator;

public class SystemAdministratorDTO {
    private Integer userId;
    private Integer sysAdminId;

    public SystemAdministratorDTO() {
    }

    public SystemAdministratorDTO(SystemAdministrator sysAdmin) {
        this(sysAdmin.getSysAdminId());
    }

    public SystemAdministratorDTO(Integer sysAdminId) {
        this.sysAdminId = sysAdminId;
    }

    public Integer getSysAdminId() {
        return sysAdminId;
    }

    public void setSysAdminId(Integer sysAdminId) {
        this.sysAdminId = sysAdminId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
