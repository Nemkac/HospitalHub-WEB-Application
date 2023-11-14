package HospitalHub.demo.controller;

import HospitalHub.demo.dto.CompanyDTO;
import HospitalHub.demo.dto.UserDto;
import HospitalHub.demo.dto.UserProfileDTO;
import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.User;
import HospitalHub.demo.service.CompanyAdministratorService;
import HospitalHub.demo.service.CompanyService;
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
    @Autowired
    private CompanyService companyService;

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

    @GetMapping(value = "/profile/{id}")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Integer id) {
        if(userService.getById(id) != null) {
            UserProfileDTO userProfileDTO = new UserProfileDTO(userService.getById(id));
            return new ResponseEntity<>(userProfileDTO,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PutMapping(consumes="application/json", value="updateProfile/{id}")
    public ResponseEntity<UserProfileDTO> updateUser(@RequestBody UserProfileDTO userProfileDTO, @PathVariable Integer id){
        // ako je neko polje prazno, da uzme staru vrednost
        if(userService.getById(id) != null){
            if(userProfileDTO.getName() != ""){userService.getById(id).setName(userProfileDTO.getName());}
            if(userProfileDTO.getLastName() != ""){userService.getById(id).setLastName(userProfileDTO.getLastName()); }
            if(userProfileDTO.getPassword() != ""){userService.getById(id).setPassword(userProfileDTO.getPassword()); }
            if(userProfileDTO.getDateOfBirth().toString() != ""){userService.getById(id).setDateOfBirth(userProfileDTO.getDateOfBirth()); }
            if(userProfileDTO.getPhoneNumber() != ""){userService.getById(id).setPhoneNumber(userProfileDTO.getPhoneNumber()); }
            if(userProfileDTO.getCountry() != ""){userService.getById(id).setCity(userProfileDTO.getCity()); }
            if(userProfileDTO.getCity() != ""){userService.getById(id).setCountry(userProfileDTO.getCountry()); }
            if(userProfileDTO.getProfession() != ""){userService.getById(id).setProfession(userProfileDTO.getProfession()); }
            if(userProfileDTO.getCompanyInfo() != ""){userService.getById(id).setCompanyInfo(userProfileDTO.getCompanyInfo()); }
            userService.save(userService.getById(id));
            return new ResponseEntity<>(new UserProfileDTO(userService.getById(id)),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @GetMapping(value="/companies")
    public ResponseEntity<List<Company>> getCompaniesByFilter(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Double avgRate
    ) {
        String name1,country1,city1;
        Double avgRate1;
        if(name == null){ name1 = "";} else {name1 = name;}
        if(country == null){ country1 = "";} else {country1 = country;}
        if(city == null){ city1 = "";} else {city1 = city;}
        if(avgRate == null){ avgRate1 = 0.0;} else {avgRate1 = avgRate;}

        List<Company> companies = companyService.getFiltered(name1,country1,city1,avgRate1);
        if (!companies.isEmpty()){
            return new ResponseEntity<>(companies,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
