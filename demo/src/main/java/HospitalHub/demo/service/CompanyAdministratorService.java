package HospitalHub.demo.service;


import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.SystemAdministrator;
import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.CompanyAdministratorRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompanyAdministratorService {
    @Autowired
    private CompanyAdministratorRepository companyAdministratorRepository;

    public CompanyAdministrator getByUserId(Integer id){
        return companyAdministratorRepository.findById(id).orElseGet(null);
    }

    public CompanyAdministrator getByCompAdminId(Integer compAdminId) {
        return companyAdministratorRepository.getByCompAdminId(compAdminId);
    }

    public CompanyAdministrator save(CompanyAdministrator companyAdministrator){
        return companyAdministratorRepository.save(companyAdministrator);
    }

    public CompanyAdministrator getByUser(User user){
        return companyAdministratorRepository.getByUser(user);
    }

}
