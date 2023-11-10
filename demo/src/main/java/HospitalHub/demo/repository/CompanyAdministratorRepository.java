package HospitalHub.demo.repository;

import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.service.CompanyAdministratorService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyAdministratorRepository extends JpaRepository<CompanyAdministrator, Integer> {
    CompanyAdministrator getById(Integer id);
    CompanyAdministrator getByCompAdminId(Integer compAdminId);
}
