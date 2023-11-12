package HospitalHub.demo.controller.UserControllers;

import HospitalHub.demo.dto.UserLoginDTO;
import HospitalHub.demo.dto.UserRegisterDTO;
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

@RestController
@RequestMapping(value = "/users")
public class EmailController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailConfirmationTokenRepository emailConfirmationTokenRepository;
    @Autowired
    private EmailService emailService;



    @PostMapping(value =  "/register")
    public ResponseEntity<User>register(@RequestBody UserRegisterDTO userRegisterDto){

        if(userService.checkData(userRegisterDto)) {   //Dodati proveru za unique email, i onda napraviti adekvatan exception
                                                        //I za pasword retype
            User firstUser = new User(
                    userRegisterDto.getName(),
                    userRegisterDto.getLastname(),
                    userRegisterDto.getPassword(),
                    userRegisterDto.getDateOfBirth(),
                    userRegisterDto.getEmail(),
                    userRegisterDto.getPhoneNumber(),
                    userRegisterDto.getCountry(),
                    userRegisterDto.getCity(),
                    userRegisterDto.getProfession(),
                    userRegisterDto.getCompanyInfo()
            );

            firstUser = userService.save(firstUser);
            EmailConfirmationToken confirmationToken = new EmailConfirmationToken(firstUser);
            emailConfirmationTokenRepository.save(confirmationToken);
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(firstUser.getEmail());
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setFrom("isaisanovicNNBA@gmail.com");
            mailMessage.setText("To confirm your account, please click here : "
                    +"http://localhost:8081/users/confirm_account?token="+confirmationToken.getConfirmationToken());

            emailService.sendEmail(mailMessage);

            return new ResponseEntity<>(firstUser, HttpStatus.CREATED);
        }else {
            return null;
        }
    }
    @RequestMapping(value="/confirm_account",method = {RequestMethod.GET,RequestMethod.POST})
    public ResponseEntity<String> confirmUserAccount(@RequestParam("token")String confirmationToken){
        EmailConfirmationToken token = emailConfirmationTokenRepository.findByConfirmationToken(confirmationToken);
        if(token != null)
        {
            User user = userRepository.findByEmailIgnoreCase(token.getUser().getEmail());
            user.setEnabled(true);
            userRepository.save(user);
            return new ResponseEntity<>(user.getName()+" "+Boolean.toString(user.isEnabled()),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/logIn")
    public ResponseEntity<UserLoginDTO> logIn(@RequestBody UserLoginDTO userLoginDTO)
    {
        User user = userRepository.findByEmailIgnoreCase(userLoginDTO.getEmail());
        if(user != null)
        {
            if(user.isEnabled()) {
                if (user.getPassword().equals(userLoginDTO.getPassword())) {
                    return new ResponseEntity<>(userLoginDTO, HttpStatus.OK);
                }
            }else{
                return new ResponseEntity<>(new UserLoginDTO("User not enabled","-1"),HttpStatus.BAD_REQUEST);
            }
        }else {
            return new ResponseEntity<>(new UserLoginDTO("No such username","-2"),HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
