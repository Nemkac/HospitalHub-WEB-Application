package HospitalHub.demo.controller;

import HospitalHub.demo.dto.EquipmentPickupSlotDTO;
import HospitalHub.demo.model.*;
import HospitalHub.demo.repository.EquipmentPickupSlotRepository;
import HospitalHub.demo.service.CompanyAdministratorService;
import HospitalHub.demo.service.EquipmentPickupSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "api/slots")
public class EquipmentPickupSlotController {

    @Autowired
    private EquipmentPickupSlotService equipmentPickupSlotService;
    @Autowired
    private CompanyAdministratorService companyAdministratorService;
    @Autowired
    private EquipmentPickupSlotRepository equipmentPickupSlotRepository;


    @PostMapping("/createPredefinedSlot/{userId}")
    public ResponseEntity<EquipmentPickupSlot> createPredefinedSlot(@RequestBody EquipmentPickupSlotDTO slotDTO, @PathVariable Integer userId) {

        CompanyAdministrator companyAdministrator = companyAdministratorService.getByUserId1(userId);
        EquipmentPickupSlot newSlot = new EquipmentPickupSlot(
            slotDTO.getDateTime(),
            slotDTO.getDuration(),
            companyAdministrator
        );
        if (equipmentPickupSlotService.isSlotOverlapping(newSlot) || equipmentPickupSlotService.isSlotBeforeNow(newSlot) || !equipmentPickupSlotService.isSlotWithinCompanyWorkingHours(newSlot)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        EquipmentPickupSlot savedEquipmentPickupSlot =  equipmentPickupSlotService.save(newSlot);

        return new ResponseEntity<>(savedEquipmentPickupSlot, HttpStatus.CREATED);
    }

    @GetMapping(value = "/getById/{id}")
    public ResponseEntity<EquipmentPickupSlot> getSlotById(@PathVariable Integer id){
        EquipmentPickupSlot slot = equipmentPickupSlotService.getById(id);

        return new ResponseEntity<>(slot, HttpStatus.OK);
    }

    @GetMapping("/getUsersSlots/{id}")
    public ResponseEntity<List<EquipmentPickupSlot>> getUsersSlots(@PathVariable Integer id){
        List<EquipmentPickupSlot> usersSlots = equipmentPickupSlotService.getAllUsersSlots(id);
        if(usersSlots.isEmpty()) {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        } else{
            return new ResponseEntity<>(usersSlots,HttpStatus.OK);
        }
    }

    /*@PostMapping("/saveExtraSlot/{companyId}/{userId}")
    public ResponseEntity<EquipmentPickupSlot> saveExtraSlot(@RequestBody EquipmentPickupSlot slot, @PathVariable Integer companyId, @PathVariable Integer userId){
        if(equipmentPickupSlotService.saveExtraSlot(slot,companyId,userId) != null) {
            return new ResponseEntity<>(equipmentPickupSlotService.saveExtraSlot(slot,companyId,userId), HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    } */

    @PostMapping(consumes = "application/json", value="/saveExtraSlot/{companyId}/{userId}")
    public ResponseEntity<EquipmentPickupSlot> saveExtraSlot(@RequestBody EquipmentPickupSlot slot , @PathVariable Integer companyId, @PathVariable Integer userId){
        //DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        //slot.setDateTime(LocalDateTime.parse(dateTime,dateTimeFormatter));
        slot.setDuration(30);
        if(equipmentPickupSlotService.saveExtraSlot(slot,companyId,userId) != null) {
            return new ResponseEntity<>(equipmentPickupSlotService.saveExtraSlot(slot,companyId,userId), HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/saveTestSlot")
    public ResponseEntity<EquipmentPickupSlot> saveTestSlot(@RequestBody EquipmentPickupSlot slot){

        EquipmentPickupSlot slot1 = new EquipmentPickupSlot();
        slot.setDateTime(LocalDateTime.now().plusDays(3));
        slot.setDuration(30);
        equipmentPickupSlotService.saveExtraSlot(slot1,1,1);
        return new ResponseEntity<>(slot,HttpStatus.OK);
    }

    @GetMapping("/xxx")
    public ResponseEntity<EquipmentPickupSlot> xxx(){
        EquipmentPickupSlot slot = new EquipmentPickupSlot();
        return new ResponseEntity<>(equipmentPickupSlotRepository.save(slot),HttpStatus.OK);
    }

    @GetMapping("/getEquipment/{slotId}")
    public ResponseEntity<List<MedicalEquipment>> getEquipments(@PathVariable Integer slotId){
        return new ResponseEntity<>(equipmentPickupSlotService.getEquipmentsFromIds(equipmentPickupSlotRepository.getById(slotId).getEquipment()),HttpStatus.OK);
    }

    /*@GetMapping("/getReservedUsers/{companyId}")
    public ResponseEntity<List<User>> getReservedUsers(@PathVariable Integer userId) {
        CompanyAdministrator companyAdministrator = companyAdministratorService.getByUserId1(userId);

    }*/

}
