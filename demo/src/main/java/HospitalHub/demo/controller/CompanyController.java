package HospitalHub.demo.controller;

import HospitalHub.demo.dto.CompanyDTO;
import HospitalHub.demo.model.Company;
import HospitalHub.demo.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping(value = "api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<Company>> getAllCompanies(){
        List<Company> companies = companyService.findAll();

        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    @PostMapping(consumes = "application/json", value = "/save")
    public ResponseEntity<CompanyDTO> saveCompany(@RequestBody CompanyDTO companyDTO){
        Company company = new Company();
        company.setName(companyDTO.getName());
        company.setCity(companyDTO.getCity());
        company.setCountry(companyDTO.getCountry());
        company.setAvgRate(companyDTO.getAvgRate());

        company = companyService.save(company);
        return new ResponseEntity<>(new CompanyDTO(company), HttpStatus.CREATED);
    }

}
