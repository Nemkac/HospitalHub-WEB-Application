package HospitalHub.demo.repository;

import HospitalHub.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {

    User findByEmailIgnoreCase(String email);

}
