package HospitalHub.demo.dto;

import HospitalHub.demo.model.Complaint;
import jakarta.persistence.Column;

import java.time.LocalDateTime;

public class ComplaintDTO {
    private Integer id;
    private LocalDateTime date;
    private String text;
    private String reply;
    private boolean onCompany;
    private boolean onAdministrator;

    public ComplaintDTO() {}

    public ComplaintDTO(Complaint complaint) {
        this(complaint.getDate(), complaint.getText(), complaint.getReply(), complaint.isOnCompany(), complaint.isOnAdministrator());
    }

    public ComplaintDTO(LocalDateTime date, String text, String reply, boolean onCompany, boolean onAdministrator) {
        this.date = date;
        this.text = text;
        this.reply = reply;
        this.onCompany = onCompany;
        this.onAdministrator = onAdministrator;
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
}
