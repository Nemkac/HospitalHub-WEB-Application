package HospitalHub.demo.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "reservationDate")
    private LocalDateTime reservationDate;

    @Column(name = "dueDate")
    private LocalDateTime dueDate;

    @Column(name = "status")
    private ReservationStatus status;

    @OneToOne
    private User reservationOwner;

    @OneToMany
    private List<MedicalEquipment> reservedEquipment;

}
