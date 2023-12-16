package HospitalHub.demo.controller;

import HospitalHub.demo.dto.EquipmentPickupSlotDTO;
import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.EquipmentPickupSlot;
import HospitalHub.demo.service.CompanyAdministratorService;
import HospitalHub.demo.service.EquipmentPickupSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "api/slots")
public class EquipmentPickupSlotController {

    @Autowired
    private EquipmentPickupSlotService equipmentPickupSlotService;
    @Autowired
    private CompanyAdministratorService companyAdministratorService;


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

}
