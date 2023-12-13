package HospitalHub.demo.controller;

import HospitalHub.demo.dto.CompanyDTO;
import HospitalHub.demo.dto.UserDTO;
import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.User;
import HospitalHub.demo.service.CompanyAdministratorService;
import HospitalHub.demo.service.CompanyService;
import HospitalHub.demo.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping(value = "api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;
    @Autowired
    private CompanyAdministratorService companyAdministratorService;
    @Autowired
    private UserService userService;

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<Company>> getAllCompanies() {
        List<Company> companies = companyService.findAll();

        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    @GetMapping(value = "/getId")
    public ResponseEntity<Integer> getCompanyId() {
        Integer companyId = this.companyService.calculateCompanyId() + 1;

        return new ResponseEntity<Integer>(companyId, HttpStatus.OK);
    }

    @PostMapping(consumes = "application/json", value = "/save")
    public ResponseEntity<CompanyDTO> saveCompany(@RequestBody CompanyDTO companyDTO) {

        Company company = new Company(
                companyDTO.getName(),
                companyDTO.getCity(),
                companyDTO.getCountry()
        );

        this.companyService.save(company);
        return new ResponseEntity<>(new CompanyDTO(company), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Integer id) {
        List<Company> companies = companyService.findAll();

        for (Company company : companies) {
            int companyId = company.getId();
            if (companyId == id) {
                return new ResponseEntity<>(company, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PutMapping(consumes = "application/json", value = "/update/{id}")
    public ResponseEntity<CompanyDTO> updateCompany(@RequestBody CompanyDTO companyDTO, @PathVariable Integer id) {
        Company company = companyService.getById(id);

        if (company == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        company.setName(companyDTO.getName());
        company.setCity(companyDTO.getCity());
        company.setCountry(companyDTO.getCountry());
        company.setAvgRate(companyDTO.getAvgRate());

        company = companyService.save(company);

        return new ResponseEntity<>(new CompanyDTO(company), HttpStatus.OK);

    }


   /* @GetMapping(value = "/getAdminsCompany")
    public ResponseEntity<Company> getAdminsCompany() {

        CompanyAdministrator companyAdministrator = companyAdministratorService.getByCompAdminId(1);

        if (companyAdministrator == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Company selectedCompany = companyAdministrator.getCompany();

        selectedCompany.getMedicalEquipmentList().forEach(equipment -> {
            equipment.setCompany(null);
        });

        return new ResponseEntity<>(selectedCompany, HttpStatus.OK);
    }*/
    @GetMapping(value = "/getAdminsCompany/{id}")
    public ResponseEntity<Company> getAdminsCompany(@PathVariable Integer id) {
        User loggedInUser = userService.getById(id);
        CompanyAdministrator companyAdministrator = companyAdministratorService.getByUser(loggedInUser);

        if (companyAdministrator == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Company selectedCompany = companyAdministrator.getCompany();

        selectedCompany.getMedicalEquipmentList().forEach(equipment -> {
            equipment.setCompany(null);
        });

        return new ResponseEntity<>(selectedCompany, HttpStatus.OK);
    }

    @GetMapping(value = "/getAvailableDays/{id}")
    public ResponseEntity<List<LocalDate>> getCompaniesAvailableDaysInFollowingTen(@PathVariable Integer id){
        Company company = companyService.getById(id);
        if(company != null){
            if(companyService.getAvailableDaysInFollowingTen(id) != null) {
                return new ResponseEntity<>(companyService.getAvailableDaysInFollowingTen(id),HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
