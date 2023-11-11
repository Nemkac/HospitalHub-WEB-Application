package HospitalHub.demo.service;

import HospitalHub.demo.model.Company;
import HospitalHub.demo.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

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

    public Optional<Company> findById(Integer id){
        return companyRepository.findById(id);
    }

    public Company getById(Integer id){
        return companyRepository.getById(id);
    }

    public List<Company>  getByName(String name) {return companyRepository.getALlByNameIgnoreCase(name);}
    public List<Company> getByCity(String city) {return companyRepository.getAllByByCityIgnoreCase(city);}
    public List<Company> getByCountry(String country) {return companyRepository.getAllByCountryIgnoreCase(country);}
    public List<Company> getByAvgRate(Double avgRate) {
        List<Company> companies = new ArrayList<>();
        for (Company company:companyRepository.findAll()){
            if(company.getAvgRate() > avgRate){
                companies.add(company);
            }
        }
        return companies;
    }

    public List<Company> getFiltered(String name, String country, String city, Double avgRate){
        return companyRepository.getAllByNameContainingIgnoreCaseAndCountryContainingIgnoreCaseAndCityContainingIgnoreCaseAndAvgRateGreaterThanEqual(name,country,city,avgRate);
    }


}
