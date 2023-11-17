package HospitalHub.demo.repository;

import HospitalHub.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface UserRepository extends JpaRepository<User, Integer> { // ovde moze biti problema jer sam promenio na Long

    List<User> findAll();
    User save(User user);
    User getById(Integer id);
    User findByEmailIgnoreCase(String email);
    User findByUsername(String username);
}
