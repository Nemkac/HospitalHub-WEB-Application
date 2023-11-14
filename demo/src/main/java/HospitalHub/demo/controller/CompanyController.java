package HospitalHub.demo.controller;

import HospitalHub.demo.dto.CompanyDTO;
import HospitalHub.demo.model.Company;
import HospitalHub.demo.service.CompanyService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

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

    @GetMapping(value = "/getId")
    public ResponseEntity<Integer> getCompanyId(){
        Integer companyId = this.companyService.calculateCompanyId() + 1;

        return new ResponseEntity<Integer>(companyId, HttpStatus.OK);
    }

    @PostMapping(consumes = "application/json", value = "/save")
    public ResponseEntity<CompanyDTO> saveCompany(@RequestBody CompanyDTO companyDTO){
        Integer companyId = this.companyService.calculateCompanyId() + 1;

        //Proveriti zasto ne kreira id kako treba kada se dodaju kompanije preko skripte
        Company company = new Company(
            //companyId,
            companyDTO.getName(),
            companyDTO.getCity(),
            companyDTO.getCountry()
        );

        this.companyService.save(company);
        return new ResponseEntity<>(new CompanyDTO(company), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Integer id){
        List<Company> companies = companyService.findAll();

        for(Company company : companies){
            int companyId = company.getId();
            if(companyId == id){
                return new ResponseEntity<>(company, HttpStatus.FOUND);
            }
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PutMapping(consumes = "application/json", value = "/update/{id}")
    public ResponseEntity<CompanyDTO> updateCompany(@RequestBody CompanyDTO companyDTO, @PathVariable Integer id)
    {
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


}
