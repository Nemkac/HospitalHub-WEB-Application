package HospitalHub.demo.dto;

import HospitalHub.demo.model.Complaint;
import jakarta.persistence.Column;

import java.time.LocalDateTime;

public class ComplaintDTO {
    private Integer id;
    private String fromUser;
    private LocalDateTime date;
    private String text;
    private String reply;
    private LocalDateTime replyDate;
    private boolean onCompany;
    private boolean onAdministrator;

    public ComplaintDTO() {}

    public ComplaintDTO(Complaint complaint) {
        this(complaint.getId(), complaint.getFromUser(), complaint.getDate(), complaint.getText(), complaint.getReply(), complaint.getReplyDate(), complaint.isOnCompany(), complaint.isOnAdministrator());
    }

    public ComplaintDTO(Integer id, String fromUser, LocalDateTime date, String text, String reply, LocalDateTime replyDate, boolean onCompany, boolean onAdministrator) {
        this.id = id;
        this.fromUser = fromUser;
        this.date = date;
        this.text = text;
        this.reply = reply;
        this.replyDate = replyDate;
        this.onCompany = onCompany;
        this.onAdministrator = onAdministrator;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFromUser() {
        return fromUser;
    }

    public void setFromUser(String fromUser) {
        this.fromUser = fromUser;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public boolean isOnCompany() {
        return onCompany;
    }

    public void setOnCompany(boolean onCompany) {
        this.onCompany = onCompany;
    }

    public boolean isOnAdministrator() {
        return onAdministrator;
    }

    public void setOnAdministrator(boolean onAdministrator) {
        this.onAdministrator = onAdministrator;
    }

    public LocalDateTime getReplyDate() {
        return replyDate;
    }

    public void setReplyDate(LocalDateTime replyDate) {
        this.replyDate = replyDate;
    }
}
