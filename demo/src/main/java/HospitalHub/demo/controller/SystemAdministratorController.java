package HospitalHub.demo.controller;

import HospitalHub.demo.dto.UserDTO;
import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.SystemAdministrator;
import HospitalHub.demo.model.User;
import HospitalHub.demo.service.CompanyAdministratorService;
import HospitalHub.demo.service.CompanyService;
import HospitalHub.demo.service.SystemAdministratorService;
import HospitalHub.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "api/profile")
public class SystemAdministratorController {

    @Autowired
    public SystemAdministratorService systemAdministratorService;
    @Autowired
    public CompanyService companyService;
    @Autowired
    public CompanyAdministratorService companyAdministratorService;
    @Autowired
    public UserService userService;
    @Autowired
    private PasswordEncoder encoder;

    @GetMapping(value = "/getAllUsers")
    public ResponseEntity<List<User>>getAllUsers(){
        List<User> users = this.userService.findAll();

        return new ResponseEntity<List<User>>(users, HttpStatus.FOUND);
    }

    /*
    TODO:
     Ubaciti odabir kompanije u kojoj ce biti zaposlen admin. U dropdown menu se ubacuju samo kompanije koje nemaju
     trenutno admina. Kad se odabere kompanija, admin se dodaje u njenu listu administratora, a kod admina se dodaje id kompanije
    */

    @PutMapping(value = "/newCompanyAdmin")
    public ResponseEntity<CompanyAdministrator> createCompanyAdministrator(@RequestBody UserDTO userDTO){
        User existingUser = this.userService.findByEmail(userDTO.getEmail());

        if(existingUser != null){
            return new ResponseEntity("User already exists", HttpStatus.FORBIDDEN);
        } else {

            User newUser = new User(
                    userDTO.getUsername(),
                    userDTO.getName(),
                    userDTO.getLastName(),
                    userDTO.getPassword(),
                    userDTO.getDateOfBirth(),
                    userDTO.getEmail(),
                    userDTO.getPhoneNumber(),
                    userDTO.getCountry(),
                    userDTO.getCity(),
                    userDTO.getProfession(),
                    userDTO.getCompanyInfo(),
                    "ROLE_COMPANYADMIN",
                    true
            );

            this.userService.addUser(newUser);
            CompanyAdministrator newCompanyAdministrator = new CompanyAdministrator(newUser);
            newCompanyAdministrator = this.companyAdministratorService.save(newCompanyAdministrator);

            return new ResponseEntity<CompanyAdministrator>(newCompanyAdministrator, HttpStatus.CREATED);
        }
    }

    @PutMapping(value = "/newSysAdmin")
    public ResponseEntity<SystemAdministrator> createSystemAdministrator(@RequestBody UserDTO userDTO){
        User existingUser = this.userService.findByEmail(userDTO.getEmail());

        if(existingUser != null){
            return new ResponseEntity("User already exists", HttpStatus.FORBIDDEN);
        } else {
            User newUser = new User(
                    userDTO.getUsername(),
                    userDTO.getName(),
                    userDTO.getLastName(),
                    userDTO.getPassword(),
                    userDTO.getDateOfBirth(),
                    userDTO.getEmail(),
                    userDTO.getPhoneNumber(),
                    userDTO.getCountry(),
                    userDTO.getCity(),
                    userDTO.getProfession(),
                    userDTO.getCompanyInfo(),
                    "ROLE_SYSADMIN",
                    true
            );

            this.userService.addUser(newUser);

            SystemAdministrator newSystemAdministrator = new SystemAdministrator(newUser);
            newSystemAdministrator = this.systemAdministratorService.save(newSystemAdministrator);

            return new ResponseEntity<SystemAdministrator>(newSystemAdministrator, HttpStatus.CREATED);
        }
    }

    @GetMapping(value = "/isPasswordChanged/{id}")
    public boolean isPasswordChanged(@PathVariable Integer id){
        User user = this.userService.getById(id);
        SystemAdministrator systemAdministrator = this.systemAdministratorService.getByUser(user);

        return systemAdministrator.isPasswordChanged();
    }

    @PutMapping(value = "/changePassword/{id}")
    public ResponseEntity<User> changeSystemAdministratorPassword(@PathVariable Integer id, @RequestBody String password){
        User loggedInUser = userService.getById(id);
        SystemAdministrator systemAdministrator = systemAdministratorService.getByUser(loggedInUser);
        loggedInUser.setPassword(password);
        systemAdministrator.setPasswordChanged(true);

        userService.addUser(loggedInUser);
        systemAdministratorService.save(systemAdministrator);

        return new ResponseEntity<User>(loggedInUser, HttpStatus.OK);
    }
}
