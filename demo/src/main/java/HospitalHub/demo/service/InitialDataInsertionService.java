package HospitalHub.demo.service;

import HospitalHub.demo.model.*;
import HospitalHub.demo.repository.CompanyRepository;
import HospitalHub.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class InitialDataInsertionService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyAdministratorService companyAdministratorService;

    @Autowired
    private SystemAdministratorService systemAdministratorService;

    @Autowired
    private MedicalEqupimentService medicalEqupimentService;

    @Autowired
    private UserService userService;

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private EquipmentPickupSlotService equipmentPickupSlotService;

    @Transactional
    public void insertInitialData() {
        Company company1 = new Company(1, "Kompanija 1", "Sremska Mitrovica", "Serbia","Bulevar cara Lazara 75", 45.241173, 19.830888, "Najbolja kompanija u gradu");
        Company company2 = new Company(2, "Kompanija 2", "Novi Sad", "Serbia","Bulevar cara Lazara 75",45.241173, 19.830888, "Ovo je najbolja kompanija");
        Company company3 = new Company(3, "Kompanija 3", "Kragujevac", "Serbia", "Bulevar cara Lazara 75",45.241173, 19.830888, "Najjaca firmetina");
        Company company4 = new Company(4, "Kompanija 4", "Jagodina", "Serbia","Bulevar cara Lazara 75",45.241173, 19.830888, "Mi imamo najbolju opremu");

        companyRepository.save(company1);
        companyRepository.save(company2);
        companyRepository.save(company3);
        companyRepository.save(company4);

        LocalDate user1BirthDate = LocalDate.ofEpochDay(2002-26-1);
        User user1 = new User(
                "Blanushaolin",
                "Vladimir",
                "Blanusa",
                "vb123",
                user1BirthDate,
                "vblanusa@gmail.com",
                "0658291222",
                "Serbia",
                "Kragujevac",
                "Programer",
                "None",
                "ROLE_USER",
                true
        );

        LocalDate user2BirthDate = LocalDate.ofEpochDay(2001-15-7);
        User user2 = new User(
                "Ranita",
                "Nemanja",
                "Ranitovic",
                "nr123",
                user2BirthDate,
                "nranitovic@gmail.com",
                "0644819288",
                "Serbia",
                "Novi Sad",
                "Programer",
                "None",
                "ROLE_USER",
                true
        );

        LocalDate user3BirthDate = LocalDate.ofEpochDay(2002-25-1);
        User user3 = new User(
                "Lele",
                "Andrea",
                "Mitic",
                "am123",
                user3BirthDate,
                "amitic@gmail.com",
                "0672182233",
                "Serbia",
                "Jagodina",
                "Programer",
                "None",
                "ROLE_COMPANYADMIN",
                true
        );

        LocalDate user4BirthDate = LocalDate.ofEpochDay(2002-18-1);
        User user4 = new User(
                "Nemkac",
                "Nemanja",
                "Todorovic",
                "nt123",
                user4BirthDate,
                "nemanjatodorovic132002002@gmail.com",
                "0644316167",
                "Serbia",
                "Sremska Mitrovica",
                "Programer",
                "None",
                "ROLE_SYSADMIN",
                true
        );

        userService.addUser(user1);
        userService.addUser(user2);
        userService.addUser(user3);
        userService.addUser(user4);

        SystemAdministrator systemAdministrator = new SystemAdministrator(user4);
        systemAdministratorService.save(systemAdministrator);

        CompanyAdministrator companyAdministrator = new CompanyAdministrator(user3, company2);
        companyAdministratorService.save(companyAdministrator);

        MedicalEquipment equipment1 = new MedicalEquipment("Respirator", "Machine", "Good respirator", company1, 320.00, "respirator.png");
        MedicalEquipment equipment2 = new MedicalEquipment("EKG", "Diagnostics", "Good ekg", company1, 860.00, "ekg.png");
        MedicalEquipment equipment3 = new MedicalEquipment("CT Scanner", "Imaging", "Good CT", company2, 1230.00, "ctscanner.png");
        MedicalEquipment equipment4 = new MedicalEquipment("Ultrasound ", "Imaging", "Good ekg", company2, 250.00, "ultrasound.png");
        MedicalEquipment equipment5 = new MedicalEquipment("Anesthesia machine", "Machine", "Good anesthesia machine", company3, 225.00, "anesthesia.png");
        MedicalEquipment equipment6 = new MedicalEquipment("Hemodialysis machine", "Machine", "Good hemodialysis machine", company3, 2000.00, "hemodialysis.png");
        MedicalEquipment equipment7 = new MedicalEquipment("Hip prothesis", "Implantable", "Good prothesis", company4, 500.00, "prosthesis.png");
        MedicalEquipment equipment8 = new MedicalEquipment("Pacemaker", "Implantable", "Good pacemaker", company4, 1250.00, "pacemaker.png");

        medicalEqupimentService.save(equipment1);
        medicalEqupimentService.save(equipment2);
        medicalEqupimentService.save(equipment3);
        medicalEqupimentService.save(equipment4);
        medicalEqupimentService.save(equipment5);
        medicalEqupimentService.save(equipment6);
        medicalEqupimentService.save(equipment7);
        medicalEqupimentService.save(equipment8);



        LocalDateTime complaint1Date = LocalDateTime.of(2023, 1, 12, 14, 32);
        Complaint complaint1 = new Complaint(user1.getUsername(), complaint1Date, "Los admin", false, true);
        complaint1.setReply("Nije los");
        LocalDateTime complaint1ReplyDate = LocalDateTime.of(2023, 1, 12, 15, 32);
        complaint1.setReplyDate(complaint1ReplyDate);

        LocalDateTime complaint2Date = LocalDateTime.of(2023, 2, 2, 4, 22);
        Complaint complaint2 = new Complaint(user2.getUsername(), complaint2Date, "Losa kompanija", true, false);

        LocalDateTime complaint3Date = LocalDateTime.of(2023, 6, 18, 23, 0);
        Complaint complaint3 = new Complaint(user1.getUsername(), complaint3Date, "Jos gori admin", false, true);
        complaint3.setReply("Tako je, los je");
        LocalDateTime complaint3ReplyDate = LocalDateTime.of(2023, 6, 18, 23, 32);
        complaint3.setReplyDate(complaint3ReplyDate);

        LocalDateTime complaint4Date = LocalDateTime.of(2023, 2, 2, 8, 30);
        Complaint complaint4 = new Complaint(user2.getUsername(), complaint4Date, "Najgora kompanija", true, false);

        complaintService.save(complaint1);
        complaintService.save(complaint2);
        complaintService.save(complaint3);
        complaintService.save(complaint4);

        LocalDateTime slot1DateTime = LocalDateTime.of(2023, 2, 2, 8, 30);
        EquipmentPickupSlot slot1 = new EquipmentPickupSlot(slot1DateTime, 45, companyAdministrator);
        slot1.setReservedBy(user1);
        LocalDateTime slot2DateTime = LocalDateTime.of(2023, 2, 12, 12, 30);
        EquipmentPickupSlot slot2 = new EquipmentPickupSlot(slot2DateTime, 30, companyAdministrator);
        slot2.setReservedBy(user2);
        LocalDateTime slot3DateTime = LocalDateTime.of(2023, 4, 2, 15, 30);
        EquipmentPickupSlot slot3 = new EquipmentPickupSlot(slot3DateTime, 15, companyAdministrator);
        LocalDateTime slot4DateTime = LocalDateTime.of(2023, 4, 2, 14, 30);
        EquipmentPickupSlot slot4 = new EquipmentPickupSlot(slot4DateTime, 30, companyAdministrator);
        slot4.setReservedBy(user1);
        LocalDateTime slot5DateTime = LocalDateTime.of(2023, 5, 2, 13, 30);
        EquipmentPickupSlot slot5 = new EquipmentPickupSlot(slot5DateTime, 30, companyAdministrator);
        slot5.setReservedBy(user2);
        LocalDateTime slot6DateTime = LocalDateTime.of(2022, 5, 2, 12, 30);
        EquipmentPickupSlot slot6 = new EquipmentPickupSlot(slot6DateTime, 45, companyAdministrator);
        LocalDateTime slot7DateTime = LocalDateTime.of(2023, 7, 2, 11, 30);
        EquipmentPickupSlot slot7 = new EquipmentPickupSlot(slot7DateTime, 60, companyAdministrator);
        slot7.setReservedBy(user1);
        LocalDateTime slot8DateTime = LocalDateTime.of(2022, 9, 2, 10, 30);
        EquipmentPickupSlot slot8 = new EquipmentPickupSlot(slot8DateTime, 30, companyAdministrator);
        slot8.setReservedBy(user2);
        LocalDateTime slot9DateTime = LocalDateTime.of(2023, 5, 2, 10, 30);
        EquipmentPickupSlot slot9 = new EquipmentPickupSlot(slot9DateTime, 30, companyAdministrator);

        equipmentPickupSlotService.save(slot1);
        equipmentPickupSlotService.save(slot2);
        equipmentPickupSlotService.save(slot3);
        equipmentPickupSlotService.save(slot4);
        equipmentPickupSlotService.save(slot5);
        equipmentPickupSlotService.save(slot6);
        equipmentPickupSlotService.save(slot7);
        equipmentPickupSlotService.save(slot8);
        equipmentPickupSlotService.save(slot9);

    }

}
