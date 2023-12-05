package HospitalHub.demo.repository;

import HospitalHub.demo.model.SystemAdministrator;
import HospitalHub.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SystemAdministratorRepository extends JpaRepository<SystemAdministrator, Integer> {

    SystemAdministrator save(SystemAdministrator systemAdministrator);
    List<SystemAdministrator> findAll();
    SystemAdministrator getByUser(User user);

}
