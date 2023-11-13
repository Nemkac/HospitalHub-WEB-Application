package HospitalHub.demo.controller;

import HospitalHub.demo.dto.UserDTO;
import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.User;
import HospitalHub.demo.service.CompanyAdministratorService;
import HospitalHub.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/user")
public class UserController {
    @Autowired
    private CompanyAdministratorService companyAdministratorService;

    @Autowired
    private UserService userService;

    @PutMapping(consumes = "application/json", value = "/update/{id}")
    public ResponseEntity<UserDTO> updateCompany(@RequestBody UserDTO userDto, @PathVariable Integer id)
    {
        CompanyAdministrator companyAdministrator = companyAdministratorService.getByCompAdminId(id);

        List<User> users = userService.findAll();

        if (companyAdministrator == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        for(User user : users) {
            if (companyAdministrator.getId() == user.getId())
            {
                user.setName(userDto.getName());
                user.setLastName(userDto.getLastName());
                user.setPassword(userDto.getPassword());
                user.setDateOfBirth(userDto.getDateOfBirth());
                user.setEmail(userDto.getEmail());
                user.setPhoneNumber(userDto.getPhoneNumber());
                user.setCountry(userDto.getCountry());
                user.setCity(userDto.getCity());
                user.setProfession(userDto.getProfession());
                user.setCompanyInfo(userDto.getCompanyInfo());

                userService.save(user);

                return new ResponseEntity<>(new UserDTO(userDto), HttpStatus.OK);
            }

        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }
}
