package HospitalHub.demo.repository;

import HospitalHub.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<User,Integer> {
}
