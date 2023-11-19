package HospitalHub.demo.controller.UserControllers;

import HospitalHub.demo.dto.AuthRequestDTO;
import HospitalHub.demo.dto.UserLoginDTO;
import HospitalHub.demo.dto.UserRegisterDTO;
import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.EmailConfirmationTokenRepository;
import HospitalHub.demo.repository.UserRepository;
import HospitalHub.demo.service.EmailService;
import HospitalHub.demo.service.JwtService;
import HospitalHub.demo.service.UserService;
import HospitalHub.demo.token.EmailConfirmationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmailController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailConfirmationTokenRepository emailConfirmationTokenRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    JwtService jwtService; //dodavanje jwt servisa posle

    @PostMapping(value =  "/register")
    public ResponseEntity<User>register(@RequestBody UserRegisterDTO userRegisterDto){

        if(userService.checkData(userRegisterDto)) {   //Dodati proveru za unique email, i onda napraviti adekvatan exception
                                                        //I za pasword retype
            User firstUser = new User(
                    userRegisterDto.getUsername(),
                    userRegisterDto.getName(),
                    userRegisterDto.getLastname(),
                    userRegisterDto.getPassword(),
                    userRegisterDto.getDateOfBirth(),
                    userRegisterDto.getEmail(),
                    userRegisterDto.getPhoneNumber(),
                    userRegisterDto.getCountry(),
                    userRegisterDto.getCity(),
                    userRegisterDto.getProfession(),
                    userRegisterDto.getCompanyInfo(),
                    "ROLE_USER"
            );

            firstUser = userService.addUser(firstUser);
            EmailConfirmationToken confirmationToken = new EmailConfirmationToken(firstUser);
            emailConfirmationTokenRepository.save(confirmationToken);
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(firstUser.getEmail());
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setFrom("isaisanovicNNBA@gmail.com");
            mailMessage.setText("To confirm your account, please click here : "
                    +"http://localhost:8081/confirm_account?token="+confirmationToken.getConfirmationToken());

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

    @PostMapping("/logIn")
    public ResponseEntity<UserLoginDTO> logIn(@RequestBody UserLoginDTO userLoginDTO) //Ubaciti ovde authentication iz /generateToken
    {
        User user = userRepository.findByEmailIgnoreCase(userLoginDTO.getEmail());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if(user != null)
        {
            if(user.isEnabled()) {
                if (encoder.matches(userLoginDTO.getPassword(),user.getPassword())) {
                    String token = jwtService.generateToken(user.getUsername()); //Moze biti problema sa logovanjem. Jer se loguje pomocu mejla. A security trazi username(oko generisanja tokena)

                    return new ResponseEntity<>(new UserLoginDTO(token, ""), HttpStatus.OK);
                }else{
                    return new ResponseEntity<>(new UserLoginDTO("Wrong password","0"),HttpStatus.BAD_REQUEST);
                }
            }else{
                return new ResponseEntity<>(new UserLoginDTO("User not enabled","-1"),HttpStatus.BAD_REQUEST);
            }
        }else {
            return new ResponseEntity<>(new UserLoginDTO("No such username","-2"),HttpStatus.BAD_REQUEST);
        }

    }
    @PostMapping(value = "/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequestDTO authRequest) {
       Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
       if (authentication.isAuthenticated()) {
        return jwtService.generateToken(authRequest.getUsername());

        } else {

            throw new UsernameNotFoundException("invalid user request !");
        }
    }

    @GetMapping(value = "/getTokenUsername")
    public String getTokenUsername(@RequestBody String token){
        return jwtService.extractUsername(token);
    }

    @GetMapping(value = "/users/TestAuthToken")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String getTokenTest(){
        return "RADI BATO";
    }

}
