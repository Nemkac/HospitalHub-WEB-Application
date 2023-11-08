package HospitalHub.demo.controller.UserControllers;

import HospitalHub.demo.dto.UserDTO;
import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.EmailConfirmationTokenRepository;
import HospitalHub.demo.repository.UserRepository;
import HospitalHub.demo.service.EmailService;
import HospitalHub.demo.service.UserService;
import HospitalHub.demo.token.EmailConfirmationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailConfirmationTokenRepository emailConfirmationTokenRepository;

    @Autowired
    private EmailService emailService;



    @PostMapping(value =  "/register")
    public ResponseEntity<User>register(@RequestBody UserDTO userDto){

        if(userService.checkData(userDto)) {

            User firstUser = new User(
                    userDto.getName(),
                    userDto.getLastname(),
                    userDto.getPassword(),
                    userDto.getDateOfBirth(),
                    userDto.getEmail(),
                    userDto.getPhoneNumber(),
                    userDto.getCountry(),
                    userDto.getCity(),
                    userDto.getProfession(),
                    userDto.getCompanyInfo()
            );

            firstUser = userService.save(firstUser);
            EmailConfirmationToken confirmationToken = new EmailConfirmationToken(firstUser);
            emailConfirmationTokenRepository.save(confirmationToken);
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(firstUser.getEmail());
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setFrom("isaisanovicNNBA@gmail.com"); // MENJAJ
            mailMessage.setText("To confirm your account, please click here : "
                    +"http://localhost:8081/confirm-account?token="+confirmationToken.getConfirmationToken()); //treba dodatio kontroler "/confirm-account," koji kada se pogodi
                                                                                                                // sa ovog linka, stavlja korisniku enabled na true
            emailService.sendEmail(mailMessage);

            return new ResponseEntity<>(firstUser, HttpStatus.CREATED);
        }else{
            return null;
        }
    }
}
