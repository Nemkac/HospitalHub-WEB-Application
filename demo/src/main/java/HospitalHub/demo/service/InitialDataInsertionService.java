package HospitalHub.demo.service;

import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.SystemAdministrator;
import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.CompanyRepository;
import HospitalHub.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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
                "Vladimir",
                "Blanusa",
                "vb123",
                user1BirthDate,
                "vblanusa@gmail.com",
                "0658291222",
                "Serbia",
                "Kragujevac",
                "Programer",
                "None"
        );

        LocalDate user2BirthDate = LocalDate.ofEpochDay(2001-15-7);
        User user2 = new User(
                "Nemanja",
                "Ranitovic",
                "nr123",
                user2BirthDate,
                "nranitovic@gmail.com",
                "0644819288",
                "Serbia",
                "Novi Sad",
                "Programer",
                "None"
        );

        LocalDate user3BirthDate = LocalDate.ofEpochDay(2002-25-1);
        User user3 = new User(
                "Andrea",
                "Mitic",
                "am123",
                user3BirthDate,
                "amitic@gmail.com",
                "0672182233",
                "Serbia",
                "Jagodina",
                "Programer",
                "None"
        );

        LocalDate user4BirthDate = LocalDate.ofEpochDay(2002-18-1);
        User user4 = new User(
                "Nemanja",
                "Todorovic",
                "nt123",
                user4BirthDate,
                "nemanjatodorovic132002002@gmail.com",
                "0644316167",
                "Serbia",
                "Sremska Mitrovica",
                "Programer",
                "None"
        );

        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
        userRepository.save(user4);

        SystemAdministrator systemAdministrator = new SystemAdministrator(user4);
        systemAdministratorService.save(systemAdministrator);

        CompanyAdministrator companyAdministrator = new CompanyAdministrator(user3);
        companyAdministratorService.save(companyAdministrator);



    }

}
