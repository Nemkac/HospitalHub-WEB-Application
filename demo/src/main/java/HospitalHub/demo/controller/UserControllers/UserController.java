package HospitalHub.demo.controller.UserControllers;

import HospitalHub.demo.dto.UserDTO;
import HospitalHub.demo.model.User;
import HospitalHub.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    private UserService userService;

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
            return new ResponseEntity<>(firstUser, HttpStatus.CREATED);
        }else{
            return null;
        }
    }
}
