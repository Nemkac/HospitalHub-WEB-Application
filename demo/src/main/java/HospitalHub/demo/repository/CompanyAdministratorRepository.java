package HospitalHub.demo.repository;

import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.SystemAdministrator;
import HospitalHub.demo.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyAdministratorRepository extends JpaRepository<CompanyAdministrator, Integer> {

    CompanyAdministrator getByCompAdminId(Integer compAdminId);
    CompanyAdministrator save(CompanyAdministrator companyAdministrator);

    CompanyAdministrator getByUser(User user);
    CompanyAdministrator findByUserId(Integer userId);

    List<CompanyAdministrator> findAll();

}
