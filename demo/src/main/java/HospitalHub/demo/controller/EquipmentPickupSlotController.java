package HospitalHub.demo.controller;

import HospitalHub.demo.dto.EquipmentPickupSlotDTO;
import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.EquipmentPickupSlot;
import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.UserRepository;
import HospitalHub.demo.service.CompanyAdministratorService;
import HospitalHub.demo.service.EquipmentPickupSlotService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/slots")
public class EquipmentPickupSlotController {

    @Autowired
    private EquipmentPickupSlotService equipmentPickupSlotService;
    @Autowired
    private CompanyAdministratorService companyAdministratorService;
    @Autowired
    private UserRepository userRepository;


    @PostMapping("/createPredefinedSlot/{userId}")
    public ResponseEntity<EquipmentPickupSlot> createPredefinedSlot(@RequestBody EquipmentPickupSlotDTO slotDTO, @PathVariable Integer userId) {

        CompanyAdministrator companyAdministrator = companyAdministratorService.getByUserId1(userId);
        EquipmentPickupSlot newSlot = new EquipmentPickupSlot(
            slotDTO.getDateTime(),
            slotDTO.getDuration(),
            companyAdministrator
        );

        EquipmentPickupSlot savedEquipmentPickupSlot =  equipmentPickupSlotService.save(newSlot);

        return new ResponseEntity<>(savedEquipmentPickupSlot, HttpStatus.CREATED);
    }

    /*@GetMapping("/getUsersSlots/{id}")
    public ResponseEntity<List<EquipmentPickupSlot>> getUsersSlots(@PathVariable Integer id){
        List<EquipmentPickupSlot> usersSlots = equipmentPickupSlotService.getAllUsersSlots(id);
        if( usersSlots.isEmpty() || usersSlots==null ) {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(usersSlots,HttpStatus.OK);
    }*/

    @GetMapping("/getUsersSlots/{id}")
    public ResponseEntity<List<EquipmentPickupSlot>> getUsersSlots(@PathVariable Integer id){
        List<EquipmentPickupSlot> usersSlots = equipmentPickupSlotService.getAllUsersSlots(id);
        if( usersSlots.isEmpty() || usersSlots==null ) {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(equipmentPickupSlotService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/getNumberOfUsersSlots/{id}")
    public ResponseEntity<Integer> getNumberOfUsersSlots(@PathVariable Integer id){
        return new ResponseEntity<>(equipmentPickupSlotService.getNumberOfUserSlots(id),HttpStatus.OK);
    }

    @PostMapping("/saveSlotByUser")
    public ResponseEntity<EquipmentPickupSlot> saveSlotByUser(@RequestBody EquipmentPickupSlot slot){
        return new ResponseEntity<>(equipmentPickupSlotService.saveSlotByUser(slot),HttpStatus.OK);
    }

    @GetMapping("/getAllSlots")
    public ResponseEntity<List<EquipmentPickupSlot>> getAllSlots(){
        return new ResponseEntity<>(equipmentPickupSlotService.getAll(),HttpStatus.OK);
    }

    @PutMapping("/occupyPredefinedSlot")
    public ResponseEntity<EquipmentPickupSlot> occupyPredefinedSlot(@RequestBody EquipmentPickupSlot slot){
        EquipmentPickupSlot savedSlot = equipmentPickupSlotService.occupyPredefinedSlot(slot);
        if(equipmentPickupSlotService != null) {
            return new ResponseEntity<>(savedSlot,HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    }

    @PutMapping("/occupyPredifinedSlot/{id}")
    public ResponseEntity<EquipmentPickupSlot> occupyPredefinedSlotUsingId(@RequestBody EquipmentPickupSlot slot,
                                                                           @PathVariable Integer id){
        User user = userRepository.getById(id);
        if(user != null){
            slot.setReservedBy(user);
            EquipmentPickupSlot updatedSlot = equipmentPickupSlotService.save(slot);
            if(updatedSlot != null) {
                return new ResponseEntity<>(slot, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    }

}
