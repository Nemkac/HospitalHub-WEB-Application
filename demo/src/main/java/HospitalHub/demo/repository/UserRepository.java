package HospitalHub.demo.repository;

import HospitalHub.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    List<User> findAll();

    User save(User user);

    User getById(Integer id);

    User findByEmailIgnoreCase(String email);
    User findByEmail(String email);

    Optional <User> findByUsername(String username);

}

