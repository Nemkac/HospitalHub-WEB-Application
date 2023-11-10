package HospitalHub.demo.service;


import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.repository.CompanyAdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyAdministratorService {
    @Autowired
    private CompanyAdministratorRepository companyAdministratorRepository;

    public CompanyAdministrator getById(Integer id){
        return companyAdministratorRepository.getById(id);
    }

    public CompanyAdministrator getByCompAdminId(Integer compAdminId) {
        return companyAdministratorRepository.getByCompAdminId(compAdminId);
    }
}
