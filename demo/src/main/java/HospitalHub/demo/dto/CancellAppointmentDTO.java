package HospitalHub.demo.dto;

public class CancellAppointmentDTO {

    private Integer userId;
    private Integer appointmentId;

    public CancellAppointmentDTO(Integer userId, Integer appointMentId) {
        this.userId = userId;
        this.appointmentId = appointMentId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Integer appointMentId) {
        this.appointmentId = appointMentId;
    }
}
