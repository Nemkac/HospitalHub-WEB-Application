package HospitalHub.demo.controller;

import HospitalHub.demo.dto.UserDTO;
import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.User;
import HospitalHub.demo.service.CompanyAdministratorService;
import HospitalHub.demo.service.CompanyService;
import HospitalHub.demo.service.SystemAdministratorService;
import HospitalHub.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping(value = "/getAllUsers")
    public ResponseEntity<List<User>>getAllUsers(){
        List<User> users = this.userService.findAll();

        return new ResponseEntity<List<User>>(users, HttpStatus.FOUND);
    }


    @PutMapping(value = "/newCompanyAdmin")
    public ResponseEntity<CompanyAdministrator> createCompanyAdministrator(@RequestBody UserDTO userDTO){
        User existingUser = this.userService.findByEmail(userDTO.getEmail());

        if(existingUser != null){
            return new ResponseEntity("User already exists", HttpStatus.FORBIDDEN);
        } else {
            Integer userId = this.userService.calculateUserId() + 1;

            User newUser = new User(
                    userId,
                    userDTO.getName(),
                    userDTO.getLastName(),
                    userDTO.getPassword(),
                    userDTO.getDateOfBirth(),
                    userDTO.getEmail(),
                    userDTO.getPhoneNumber(),
                    userDTO.getCountry(),
                    userDTO.getCity(),
                    userDTO.getProfession(),
                    userDTO.getCompanyInfo()
            );

            this.userService.save(newUser);
            CompanyAdministrator newCompanyAdministrator = new CompanyAdministrator(newUser);
            newCompanyAdministrator = this.companyAdministratorService.save(newCompanyAdministrator);

            return new ResponseEntity<CompanyAdministrator>(newCompanyAdministrator, HttpStatus.CREATED);
        }
    }
}
