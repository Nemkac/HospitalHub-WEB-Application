package HospitalHub.demo.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "text")
    private String text;

    @Column(name = "reply")
    private String reply;

    @Column
    private boolean onCompany;

    @Column
    private boolean onAdministrator;

    public Complaint() {}

    public Complaint(LocalDateTime date, String text, boolean onCompany, boolean onAdministrator) {
        this.date = date;
        this.text = text;
        this.onCompany = onCompany;
        this.onAdministrator = onAdministrator;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
