package HospitalHub.demo.repository;

import HospitalHub.demo.token.EmailConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailConfirmationTokenRepository extends JpaRepository<EmailConfirmationToken,String> {

    EmailConfirmationToken findByConfirmationToken(String emailConfirmationToken);

}
