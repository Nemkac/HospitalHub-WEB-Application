package HospitalHub.demo.controller;

import HospitalHub.demo.dto.SystemAdministratorDTO;
import HospitalHub.demo.model.SystemAdministrator;
import HospitalHub.demo.model.User;
import HospitalHub.demo.service.SystemAdministratorService;
import HospitalHub.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/profile")
public class SystemAdministratorController {

    @Autowired
    public SystemAdministratorService systemAdministratorService;

    //Proveriti da li radi. Pitati gpt kako bi bila bolja ideja da se odradi
    /*@PostMapping(consumes = "application/json", value = "/save")
    public ResponseEntity<SystemAdministratorDTO> createNewSystemAdministrator(@RequestBody SystemAdministratorDTO systemAdministratorDTO){
        List<SystemAdministrator> systemAdministrators = systemAdministratorService.findAll();

        for(SystemAdministrator sysAdmin : systemAdministrators){
            if(sysAdmin.getId() == systemAdministratorDTO.getUserId()){
                return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
            }
        }

        SystemAdministrator systemAdministrator = new SystemAdministrator();
        systemAdministrator.setId(systemAdministratorDTO.getUserId());
        systemAdministrator.setSysAdminId(systemAdministratorDTO.getSysAdminId());

        systemAdministratorService.save(systemAdministrator);

        return new ResponseEntity<>(new SystemAdministratorDTO(systemAdministrator), HttpStatus.CREATED);
    }*/

    @PostMapping("/makeNewSysAdmin")
    public ResponseEntity<Object> makeUserSystemAdministrator(@RequestParam Integer userId) {
        SystemAdministrator systemAdministrator = systemAdministratorService.makeUserSystemAdministrator(userId);

        if (systemAdministrator != null) {
            return new ResponseEntity<>(systemAdministrator, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("User is already a system administrator", HttpStatus.BAD_REQUEST);
        }
    }
}
