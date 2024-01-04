package HospitalHub.demo.service;

import HospitalHub.demo.model.*;
import HospitalHub.demo.repository.CompanyRepository;
import HospitalHub.demo.repository.EquipmentPickupSlotRepository;
import HospitalHub.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

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

    @Autowired
    private EquipmentPickupSlotRepository equipmentPickupSlotRepository;

    @Transactional
    public void insertInitialData() {
        Company company1 = new Company(1, "HealthTech Solutions", "Sremska Mitrovica", "Serbia", "Bulevar Lazar 75", 45.241173, 19.830888, "Leading provider of innovative healthcare solutions, dedicated to improving patient care and outcomes.", LocalTime.of(8, 0), LocalTime.of(20, 0));
        Company company2 = new Company(2, "MedEquip Innovations", "Novi Sad", "Serbia", "Lazar Bulevar 75", 45.241173, 19.830888, "Your trusted partner for cutting-edge medical equipment, committed to advancing healthcare excellence.", LocalTime.of(8, 0), LocalTime.of(20, 0));
        Company company3 = new Company(3, "VitalCare Technologies", "Kragujevac", "Serbia", "Cara Lazara Bulevar 75", 45.241173, 19.830888, "Empowering healthcare with robust and reliable solutions, ensuring the highest standards of medical practice.", LocalTime.of(8, 0), LocalTime.of(20, 0));
        Company company4 = new Company(4, "MedTech Dynamics", "Jagodina", "Serbia", "Lazara Bulevar 75", 45.241173, 19.830888, "Pioneering medical excellence with state-of-the-art equipment and unparalleled expertise in healthcare technology.", LocalTime.of(8, 0), LocalTime.of(20, 0));


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

        LocalDate user5BirthDate = LocalDate.ofEpochDay(2001-25-8);
        User user5 = new User(
                "Sime",
                "Aleksa",
                "Simeunovic",
                "as123",
                user5BirthDate,
                "asimeunovic@gmail.com",
                "0673123412",
                "Serbia",
                "Cacak",
                "Designer",
                "None",
                "ROLE_COMPANYADMIN",
                true
        );

        userService.addUser(user1);
        userService.addUser(user2);
        userService.addUser(user3);
        userService.addUser(user4);
        userService.addUser(user5);

        SystemAdministrator systemAdministrator = new SystemAdministrator(user4);
        systemAdministratorService.save(systemAdministrator);

        CompanyAdministrator companyAdministrator1 = new CompanyAdministrator(user3, company1);
        CompanyAdministrator companyAdministrator2 = new CompanyAdministrator(user5, company1);

        companyAdministratorService.save(companyAdministrator1);
        companyAdministratorService.save(companyAdministrator2);

        MedicalEquipment equipment1 = new MedicalEquipment("Respirator", "Machine", "Reliable respiratory machine for optimal patient support.", company1, 320.00, "respirator.png", 20);
        MedicalEquipment equipment2 = new MedicalEquipment("EKG", "Diagnostics", "State-of-the-art EKG machine for accurate heart diagnostics.", company1, 860.00, "ekg.png", 30);
        MedicalEquipment equipment3 = new MedicalEquipment("CT Scanner", "Imaging", "Cutting-edge CT scanner for precise diagnostics.", company2, 1230.00, "ctscanner.png", 15);
        MedicalEquipment equipment4 = new MedicalEquipment("Ultrasound", "Imaging", "Advanced ultrasound equipment for detailed imaging.", company2, 250.00, "ultrasound.png", 40);
        MedicalEquipment equipment5 = new MedicalEquipment("Anesthesia Machine", "Machine", "High-performance anesthesia machine for safe administration.", company3, 225.00, "anesthesia.png", 32);
        MedicalEquipment equipment6 = new MedicalEquipment("Hemodialysis Machine", "Machine", "Cutting-edge hemodialysis machine for life-saving treatment.", company1, 2000.00, "hemodialysis.png", 77);
        MedicalEquipment equipment7 = new MedicalEquipment("Hip Prosthesis", "Implantable", "Top-quality hip prosthesis to enhance mobility.", company1, 500.00, "prosthesis.png", 9);
        MedicalEquipment equipment8 = new MedicalEquipment("Pacemaker", "Implantable", "Advanced pacemaker for reliable heart rhythm management.", company1, 1250.00, "pacemaker.png", 1);

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
        EquipmentPickupSlot slot1 = new EquipmentPickupSlot(slot1DateTime, 45, companyAdministrator2);
        //slot1.setReservedBy(user1);
        LocalDateTime slot2DateTime = LocalDateTime.of(2023, 2, 13, 12, 30);
        EquipmentPickupSlot slot2 = new EquipmentPickupSlot(slot2DateTime, 30, companyAdministrator2);
        //lot2.setReservedBy(user2);
        LocalDateTime slot3DateTime = LocalDateTime.of(2023, 4, 3, 15, 30);
        EquipmentPickupSlot slot3 = new EquipmentPickupSlot(slot3DateTime, 15, companyAdministrator1);
        LocalDateTime slot4DateTime = LocalDateTime.of(2023, 4, 4, 14, 30);
        EquipmentPickupSlot slot4 = new EquipmentPickupSlot(slot4DateTime, 30, companyAdministrator1);
        //slot4.setReservedBy(user1);
        LocalDateTime slot5DateTime = LocalDateTime.of(2023, 5, 2, 13, 30);
        EquipmentPickupSlot slot5 = new EquipmentPickupSlot(slot5DateTime, 30, companyAdministrator1);
        //slot5.setReservedBy(user2);
        LocalDateTime slot6DateTime = LocalDateTime.of(2023, 5, 2, 12, 30);
        EquipmentPickupSlot slot6 = new EquipmentPickupSlot(slot6DateTime, 45, companyAdministrator2);
        LocalDateTime slot7DateTime = LocalDateTime.of(2023, 7, 3, 11, 30);
        EquipmentPickupSlot slot7 = new EquipmentPickupSlot(slot7DateTime, 60, companyAdministrator1);
        //slot7.setReservedBy(user1);
        LocalDateTime slot8DateTime = LocalDateTime.of(2023, 9, 2, 10, 30);
        EquipmentPickupSlot slot8 = new EquipmentPickupSlot(slot8DateTime, 30, companyAdministrator2);
        //slot8.setReservedBy(user2);
        LocalDateTime slot9DateTime = LocalDateTime.of(2023, 5, 2, 10, 30);
        EquipmentPickupSlot slot9 = new EquipmentPickupSlot(slot9DateTime, 30, companyAdministrator1);
        LocalDateTime slot10DateTime = LocalDateTime.of(2024, 2, 2, 8, 30);
        EquipmentPickupSlot slot10 = new EquipmentPickupSlot(slot10DateTime, 45, user1, companyAdministrator2, new int[]{1, 2, 3});
        //slot1.setReservedBy(user1);
        LocalDateTime slot11DateTime = LocalDateTime.of(2024, 2, 13, 12, 30);
        EquipmentPickupSlot slot11 = new EquipmentPickupSlot(slot11DateTime, 30, user1, companyAdministrator2, new int[]{1, 2, 3});
        //slot2.setReservedBy(user2);
        LocalDateTime slot12DateTime = LocalDateTime.of(2024, 4, 3, 15, 30);
        EquipmentPickupSlot slot12 = new EquipmentPickupSlot(slot12DateTime, 15, companyAdministrator1);
        LocalDateTime slot13DateTime = LocalDateTime.of(2024, 4, 4, 14, 30);
        EquipmentPickupSlot slot13 = new EquipmentPickupSlot(slot13DateTime, 30, companyAdministrator1);
        slot13.setReservedBy(user4);
        LocalDateTime slot14DateTime = LocalDateTime.of(2024, 5, 2, 13, 30);
        EquipmentPickupSlot slot14 = new EquipmentPickupSlot(slot14DateTime, 30, user2, companyAdministrator1, new int[]{1, 2, 3});
        //slot5.setReservedBy(user2);
        LocalDateTime slot15DateTime = LocalDateTime.of(2024, 5, 2, 12, 30);
        EquipmentPickupSlot slot15 = new EquipmentPickupSlot(slot15DateTime, 45, companyAdministrator2);
        LocalDateTime slot16DateTime = LocalDateTime.of(2024, 7, 3, 11, 30);
        EquipmentPickupSlot slot16 = new EquipmentPickupSlot(slot16DateTime, 60, companyAdministrator1);
        slot16.setReservedBy(user4);
        LocalDateTime slot17DateTime = LocalDateTime.of(2024, 1, 1, 22, 53);
        EquipmentPickupSlot slot17 = new EquipmentPickupSlot(slot17DateTime, 30, user2, companyAdministrator2, new int[]{4, 5, 6});
        LocalDateTime slot18DateTime = LocalDateTime.of(2024, 1, 1, 23, 30);
        EquipmentPickupSlot slot18 = new EquipmentPickupSlot(slot18DateTime, 30, companyAdministrator1);
        LocalDateTime slot19DateTime = LocalDateTime.of(2024, 1, 1, 20, 00);
        EquipmentPickupSlot slot19 = new EquipmentPickupSlot(slot19DateTime, 20, companyAdministrator1);
        slot19.setReservedBy(user4);


        equipmentPickupSlotRepository.save(slot1);
        equipmentPickupSlotRepository.save(slot2);
        equipmentPickupSlotRepository.save(slot3);
        equipmentPickupSlotRepository.save(slot4);
        equipmentPickupSlotRepository.save(slot5);
        equipmentPickupSlotRepository.save(slot6);
        equipmentPickupSlotRepository.save(slot7);
        equipmentPickupSlotRepository.save(slot8);
        equipmentPickupSlotRepository.save(slot9);
        equipmentPickupSlotRepository.save(slot10);
        equipmentPickupSlotRepository.save(slot11);
        equipmentPickupSlotRepository.save(slot12);
        equipmentPickupSlotRepository.save(slot13);
        equipmentPickupSlotRepository.save(slot14);
        equipmentPickupSlotRepository.save(slot15);
        equipmentPickupSlotRepository.save(slot16);
        equipmentPickupSlotRepository.save(slot17);
        equipmentPickupSlotRepository.save(slot18);
        equipmentPickupSlotRepository.save(slot19);
    }

}
