package HospitalHub.demo.controller;

import HospitalHub.demo.dto.CompanyDTO;
import HospitalHub.demo.dto.UserDto;
import HospitalHub.demo.dto.UserProfileDTO;
import HospitalHub.demo.model.Company;
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
    public ResponseEntity<UserDto> updateCompany(@RequestBody UserDto userDto, @PathVariable Integer id)
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

                return new ResponseEntity<>(new UserDto(userDto), HttpStatus.OK);
            }

        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @GetMapping(value = "{id}")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Integer id)
    {
        return new ResponseEntity<>(new UserProfileDTO(userService.getById(id)),HttpStatus.OK);
    }

    @PutMapping(consumes="aplication/json", value="updateProfile/{id}")
    public ResponseEntity<UserProfileDTO> updateUser(@RequestBody UserProfileDTO userProfileDTO, @PathVariable Integer id){

        if(userService.getById(id) != null){
            userService.getById(id).setName(userProfileDTO.getName());
            userService.getById(id).setLastName(userProfileDTO.getLastName());
            userService.getById(id).setPassword(userProfileDTO.getPassword());
            userService.getById(id).setDateOfBirth(userProfileDTO.getDateOfBirth());
            userService.getById(id).setPhoneNumber(userProfileDTO.getPhoneNumber());
            userService.getById(id).setCity(userProfileDTO.getCity());
            userService.getById(id).setCountry(userProfileDTO.getCountry());
            userService.getById(id).setProfession(userProfileDTO.getProfession());
            userService.getById(id).setCompanyInfo(userProfileDTO.getCompanyInfo());
            userService.save(userService.getById(id));
            return new ResponseEntity<>(new UserProfileDTO(userService.getById(id)),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }





}
