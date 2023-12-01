package HospitalHub.demo.service;

import HospitalHub.demo.model.*;
import HospitalHub.demo.repository.CompanyRepository;
import HospitalHub.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

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
    private PasswordEncoder encoder;

    @Autowired
    private UserService userService;

    @Transactional
    public void insertInitialData() {
        Company company1 = new Company(1, "Kompanija 1", "Sremska Mitrovica", "Serbia");
        Company company2 = new Company(2, "Kompanija 2", "Novi Sad", "Serbia");
        Company company3 = new Company(3, "Kompanija 3", "Kragujevac", "Serbia");
        Company company4 = new Company(4, "Kompanija 4", "Jagodina", "Serbia");

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
                "ROLE_USER"
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
                "ROLE_USER"
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
                "ROLE_COMPANYADMIN"
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
                "ROLE_SYSADMIN"
        );

        userService.addUser(user1);
        userService.addUser(user2);
        userService.addUser(user3);
        userService.addUser(user4);

        /*userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
        userRepository.save(user4);*/

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
    }

}
