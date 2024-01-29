package HospitalHub.demo.controller;

import HospitalHub.demo.dto.EquipmentPickupSlotDTO;
import HospitalHub.demo.dto.UserDTO;
import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.EquipmentPickupSlot;
import HospitalHub.demo.model.SystemAdministrator;
import HospitalHub.demo.model.User;
import HospitalHub.demo.service.CompanyAdministratorService;
import HospitalHub.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/companyAdmin")
public class CompanyAdministratorController {

    @Autowired
    public UserService userService;

    @Autowired
    public CompanyAdministratorService companyAdministratorService;

    @GetMapping(value = "/isCompanyAdminPasswordChanged/{id}")
    public boolean isPasswordChanged(@PathVariable Integer id){
        User user = this.userService.getById(id);
        CompanyAdministrator companyAdministrator = this.companyAdministratorService.getByUser(user);

        return companyAdministrator.isPasswordChanged();
    }

    @PutMapping(value = "/changeCompanyAdminPassword/{id}")
    public ResponseEntity<User> changeCompanyAdministratorPassword(@PathVariable Integer id, @RequestBody String password){
        User loggedInUser = userService.getById(id);
        CompanyAdministrator companyAdministrator = companyAdministratorService.getByUser(loggedInUser);
        loggedInUser.setPassword(password);
        companyAdministrator.setPasswordChanged(true);

        userService.addUser(loggedInUser);
        companyAdministratorService.save(companyAdministrator);

        return new ResponseEntity<User>(loggedInUser, HttpStatus.OK);
    }

    @GetMapping(value = "/getSlots/{userId}")
    public ResponseEntity<List<EquipmentPickupSlotDTO>> getAdminsSlots(@PathVariable Integer userId){
        User user = userService.getById(userId);
        CompanyAdministrator companyAdministrator = companyAdministratorService.getByUser(user);
        List<EquipmentPickupSlot> slots = companyAdministrator.getEquipmentPickupSlots();

        List<EquipmentPickupSlotDTO> dtos = new ArrayList<>();

        for(EquipmentPickupSlot slot : slots){
            EquipmentPickupSlotDTO dto = new EquipmentPickupSlotDTO(slot);

            if(dto.getDateTime().isBefore(LocalDateTime.now())){
                dto.setStatus(EquipmentPickupSlot.Status.EXPIRED);
            }

            if(slot.getReservedBy() != null){
                dto.setReservedBy(slot.getReservedBy());
            }

            dtos.add(dto);
        }

        return new ResponseEntity<List<EquipmentPickupSlotDTO>>(dtos, HttpStatus.OK);
    }
    @GetMapping(value = "/checkCompanyAdmin")
    @PreAuthorize("hasAuthority('ROLE_COMPANYADMIN')")
    public boolean checkCompanyAdmin(){
        return true;
    }
}
