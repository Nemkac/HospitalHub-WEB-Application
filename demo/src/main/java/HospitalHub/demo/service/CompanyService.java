package HospitalHub.demo.service;

import HospitalHub.demo.model.Company;
import HospitalHub.demo.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public List<Company> findAll(){
        return companyRepository.findAll();
    }

    public Company save(Company company){
        return companyRepository.save(company);
    }
}
