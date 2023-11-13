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
}
