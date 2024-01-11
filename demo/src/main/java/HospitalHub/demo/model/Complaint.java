package HospitalHub.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "fromUser")
    private String fromUser;

    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    @Column(name = "text")
    private String text;

    @Column(name = "reply")
    private String reply;

    @Column(name ="replyDate")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime replyDate;

    @Column(name = "repliedBy")
    private String repliedBy;

    @Column
    private boolean onCompany;

    @Column
    private boolean onAdministrator;

    @Version
    private Long version;

    public Complaint() {}

    public Complaint(String fromUser, LocalDateTime date, String text, boolean onCompany, boolean onAdministrator) {
        this.fromUser = fromUser;
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

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public String getRepliedBy() {
        return repliedBy;
    }

    public void setRepliedBy(String repliedBy) {
        this.repliedBy = repliedBy;
    }
}
