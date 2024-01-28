package HospitalHub.demo.controller;

import HospitalHub.demo.dto.EquipmentPickupSlotDTO;
import HospitalHub.demo.dto.MedicalEquipmentDTO;
import HospitalHub.demo.dto.UserDTO;
import HospitalHub.demo.model.*;
import HospitalHub.demo.repository.EquipmentPickupSlotRepository;
import HospitalHub.demo.service.*;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping(value = "api/slots")
public class EquipmentPickupSlotController {

    @Autowired
    private EquipmentPickupSlotService equipmentPickupSlotService;
    @Autowired
    private CompanyAdministratorService companyAdministratorService;
    @Autowired
    private EquipmentPickupSlotRepository equipmentPickupSlotRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private MedicalEqupimentService medicalEqupimentService;

    // TODO: OVDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    @PostMapping("/createPredefinedSlot/{userId}")
    @Transactional
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

        List<EquipmentPickupSlot> updatedSlots = new ArrayList<>();
        List<EquipmentPickupSlot> slots = equipmentPickupSlotService.getAll();
        for(EquipmentPickupSlot slot : slots) {
            if(slot.getVersion() == 1){
                updatedSlots.add(slot);
            }
        }
        for(EquipmentPickupSlot updatedSlot : updatedSlots) {
            if(equipmentPickupSlotService.areSlotsOverlapping(updatedSlot,newSlot)){
                return new ResponseEntity("Conflict. Someone else has replied. Please refresh and try again.", HttpStatus.CONFLICT);
            }
        }

        EquipmentPickupSlot savedEquipmentPickupSlot = equipmentPickupSlotService.save(newSlot);

        return new ResponseEntity<>(savedEquipmentPickupSlot, HttpStatus.CREATED);
    }

    @GetMapping(value = "/getById/{id}")
    public ResponseEntity<EquipmentPickupSlot> getSlotById(@PathVariable Integer id) {
        EquipmentPickupSlot slot = equipmentPickupSlotService.getById(id);

        return new ResponseEntity<>(slot, HttpStatus.OK);
    }

    @GetMapping("/getUsersSlots/{id}")
    public ResponseEntity<List<EquipmentPickupSlot>> getUsersSlots(@PathVariable Integer id) {
        List<EquipmentPickupSlot> usersSlots = equipmentPickupSlotService.getAllUsersSlots(id);
        if (usersSlots.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(usersSlots, HttpStatus.OK);
        }
    }

    @GetMapping("/getUpcomingUsersSlots/{id}")
    public ResponseEntity<List<EquipmentPickupSlot>> getUpcomingUsersSlots(@PathVariable Integer id) {
        List<EquipmentPickupSlot> usersSlots = equipmentPickupSlotService.getUsersUpcomingSlots(id);
        if (usersSlots.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(usersSlots, HttpStatus.OK);
        }
    }

    @GetMapping("/getPastUsersSlots/{id}")
    public ResponseEntity<List<EquipmentPickupSlot>> getPastUsersSlots(@PathVariable Integer id) {
        List<EquipmentPickupSlot> usersSlots = equipmentPickupSlotService.getUsersPastSlots(id);
        if (usersSlots.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(usersSlots, HttpStatus.OK);
        }
    }

    /*@PostMapping("/saveExtraSlot/{companyId}/{userId}")
    public ResponseEntity<EquipmentPickupSlot> saveExtraSlot(@RequestBody EquipmentPickupSlot slot, @PathVariable Integer companyId, @PathVariable Integer userId){
        if(equipmentPickupSlotService.saveExtraSlot(slot,companyId,userId) != null) {
            return new ResponseEntity<>(equipmentPickupSlotService.saveExtraSlot(slot,companyId,userId), HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    } */

    // TODO : OVDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    @PostMapping(consumes = "application/json", value = "/saveExtraSlot/{companyId}/{userId}")
    public ResponseEntity<EquipmentPickupSlot> saveExtraSlot(@RequestBody EquipmentPickupSlot slot, @PathVariable Integer companyId, @PathVariable Integer userId) {
        //DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        //slot.setDateTime(LocalDateTime.parse(dateTime,dateTimeFormatter));
        slot.setDuration(30);
        if (equipmentPickupSlotService.saveExtraSlot(slot, companyId, userId) != null) {
            return new ResponseEntity<>(equipmentPickupSlotService.saveExtraSlot(slot, companyId, userId), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/saveTestSlot")
    public ResponseEntity<EquipmentPickupSlot> saveTestSlot(@RequestBody EquipmentPickupSlot slot) {

        EquipmentPickupSlot slot1 = new EquipmentPickupSlot();
        slot.setDateTime(LocalDateTime.now().plusDays(3));
        slot.setDuration(30);
        equipmentPickupSlotService.saveExtraSlot(slot1, 1, 1);
        return new ResponseEntity<>(slot, HttpStatus.OK);
    }

    @GetMapping("/xxx")
    public ResponseEntity<EquipmentPickupSlot> xxx() {
        EquipmentPickupSlot slot = new EquipmentPickupSlot();
        return new ResponseEntity<>(equipmentPickupSlotRepository.save(slot), HttpStatus.OK);
    }

    @GetMapping("/getEquipment/{slotId}")
    public ResponseEntity<List<MedicalEquipment>> getEquipments(@PathVariable Integer slotId) {
        return new ResponseEntity<>(equipmentPickupSlotService.getEquipmentsFromIds(equipmentPickupSlotRepository.getById(slotId).getEquipment()), HttpStatus.OK);
    }

    @GetMapping("/getReservedUsers/{userId}")
    public ResponseEntity<List<UserDTO>> getReservedUsers(@PathVariable Integer userId) {
        User loggedInUser = userService.getById(userId);
        CompanyAdministrator companyAdministrator = companyAdministratorService.getByUser(loggedInUser);

        if (companyAdministrator == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Company selectedCompany = companyAdministrator.getCompany();

        List<UserDTO> reservedUsersDTO = new ArrayList<>();
        Set<Integer> addedUserIds = new HashSet<>();

        for (CompanyAdministrator admin : selectedCompany.getCompanyAdministrators()) {
            for (EquipmentPickupSlot slot : admin.getEquipmentPickupSlots()) {
                if (slot.getReservedBy() != null) {
                    User reservedUser = slot.getReservedBy();

                    if (addedUserIds.add(reservedUser.getId())) {
                        reservedUsersDTO.add(new UserDTO(reservedUser));
                    }
                }
            }
        }

        reservedUsersDTO.sort(Comparator.comparing(UserDTO::getName));

        return new ResponseEntity<>(reservedUsersDTO, HttpStatus.OK);
    }

    @PatchMapping("/markEquipmentPickedUp/{slotId}")
    public ResponseEntity<EquipmentPickupSlotDTO> markEquipmentPickedUp(@PathVariable Integer slotId) {
        EquipmentPickupSlot slot = equipmentPickupSlotService.getById(slotId);

        if (slot != null && slot.getStatus() == EquipmentPickupSlot.Status.ACTIVE && shouldMarkPickedUp(slot)) {
            slot.setStatus(EquipmentPickupSlot.Status.PICKED_UP);
            equipmentPickupSlotService.saveNewStatus(slot);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private boolean shouldMarkPickedUp(EquipmentPickupSlot slot) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime reservationEnd = slot.getDateTime().plusMinutes(slot.getDuration());
        return now.isAfter(slot.getDateTime()) && reservationEnd.isAfter(now);
    }


    @PatchMapping("/updateStatusForExpiredSlots")
    public ResponseEntity<String> updateStatusForExpiredSlots() {
        List<EquipmentPickupSlot> allSlots = equipmentPickupSlotService.getAll();
        List<EquipmentPickupSlot> updatedSlots = new ArrayList<>();

        for (EquipmentPickupSlot slot : allSlots) {
            if (equipmentPickupSlotService.isSlotExpired(slot)) {
                slot.setStatus(EquipmentPickupSlot.Status.EXPIRED);
                EquipmentPickupSlot updatedSlot = equipmentPickupSlotService.saveNewStatus(slot);
                updatedSlots.add(updatedSlot);
            }
        }

        if (updatedSlots.isEmpty()) {
            return new ResponseEntity<>("NOT Ok", HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
    }

    @PutMapping("/makeSlotExpired")
    public ResponseEntity<EquipmentPickupSlot> makeSlotExpired(@RequestBody Integer slotId){
        EquipmentPickupSlot slot = equipmentPickupSlotService.getById(slotId);
        if(slot.getStatus() != EquipmentPickupSlot.Status.EXPIRED){
            User user = slot.getReservedBy();

            Integer penalties = user.getPenaltyPoints() + 2;
            user.setPenaltyPoints(penalties);
            userService.save(user);

            slot.setStatus(EquipmentPickupSlot.Status.EXPIRED);
            EquipmentPickupSlot updatedSlot = equipmentPickupSlotService.saveNewStatus(slot);

            return new ResponseEntity<>(updatedSlot, HttpStatus.OK);
        } else {
            return new ResponseEntity("Appointment status: EXPIRED", HttpStatus.OK);
        }
    }

    @PutMapping("/cancelReservation/{slotId}")
    public ResponseEntity<EquipmentPickupSlot> cancelReservation(@PathVariable Integer slotId){
        EquipmentPickupSlot canceledSlot = equipmentPickupSlotService.cancelReservation(slotId);
        if(canceledSlot != null){
            return new ResponseEntity<>(canceledSlot,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /*@PutMapping("/deliverEquipment")
    @Transactional
    public ResponseEntity<EquipmentPickupSlot> deliverEquipment(@RequestBody Integer slotId){
        //EquipmentPickupSlot slot = equipmentPickupSlotService.getById(slotId);
        //User mailUser = slot.getReservedBy();
        //List<MedicalEquipment> orderedEquipment = medicalEqupimentService.findAllById(slot.getEquipment());

        //if(slot.getStatus() != EquipmentPickupSlot.Status.PICKED_UP){

        //    slot.setStatus(EquipmentPickupSlot.Status.PICKED_UP);
        //    EquipmentPickupSlot updatedSlot = equipmentPickupSlotService.saveNewStatus(slot);

        //    for(MedicalEquipment equipment : orderedEquipment){
        //        equipment.setQuantity(equipment.getQuantity() - 1);
        //       medicalEqupimentService.save(equipment);
        //    }

        EquipmentPickupSlot slot = equipmentPickupSlotService.getById(slotId);
        User mailUser = slot.getReservedBy();

        if (slot.getStatus() != EquipmentPickupSlot.Status.PICKED_UP) {
            slot.setStatus(EquipmentPickupSlot.Status.PICKED_UP);
            EquipmentPickupSlot updatedSlot = equipmentPickupSlotService.saveNewStatus(slot);

            int[] equipmentIds = slot.getEquipment();

            Map<Integer, Integer> equipmentQuantityMap = new HashMap<>();

            for (Integer equipmentId : equipmentIds) {
                equipmentQuantityMap.put(equipmentId, equipmentQuantityMap.getOrDefault(equipmentId, 0) + 1);
            }

            for (Map.Entry<Integer, Integer> entry : equipmentQuantityMap.entrySet()) {
                Integer equipmentId = entry.getKey();
                Integer quantity = entry.getValue();

                MedicalEquipment equipment = medicalEqupimentService.findById(equipmentId);

                if (equipment != null) {
                    equipment.setQuantity(equipment.getQuantity() - quantity);
                    medicalEqupimentService.save(equipment);
                }
            }

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("isaisanovicNNBA@gmail.com");
            mailMessage.setTo(mailUser.getEmail());
            mailMessage.setSubject("Confirmation of taking over reserved equipment");
            mailMessage.setText("Appointment number: " + slot.getId() +
                    "\nAppointment date: " + slot.getDateTime() +
                    "\nDelivered by: " + slot.getCompanyAdministrator().getUser().getName() + " " + slot.getCompanyAdministrator().getUser().getLastName() +
                    "\n\nEquipment successfully delivered!" +
                    "\nThank you for using our services." +
                    "\n\nSincerely, HospitalHub");
            emailService.sendEmail(mailMessage);

            return new ResponseEntity<>(updatedSlot, HttpStatus.OK);
        } else {
            return new ResponseEntity("Appointment status: PICKED UP", HttpStatus.OK);
        }
    }*/

    @PutMapping("/deliverEquipment")
    @Transactional
    public ResponseEntity<EquipmentPickupSlot> deliverEquipment(@RequestBody Integer slotId, @RequestParam Long version) {

        EquipmentPickupSlot slot = equipmentPickupSlotService.getById(slotId);

        if (slot == null) {
            return new ResponseEntity("Slot not found", HttpStatus.NOT_FOUND);
        }

        if (!version.equals(slot.getVersion())) {
            return new ResponseEntity("Conflict: Slot has been updated by another administrator", HttpStatus.CONFLICT);
        }

        User mailUser = slot.getReservedBy();

        if (slot.getStatus() != EquipmentPickupSlot.Status.PICKED_UP) {
            slot.setStatus(EquipmentPickupSlot.Status.PICKED_UP);
            EquipmentPickupSlot updatedSlot = equipmentPickupSlotService.saveNewStatus(slot);

            int[] equipmentIds = slot.getEquipment();

            Map<Integer, Integer> equipmentQuantityMap = new HashMap<>();

            for (Integer equipmentId : equipmentIds) {
                equipmentQuantityMap.put(equipmentId, equipmentQuantityMap.getOrDefault(equipmentId, 0) + 1);
            }

            for (Map.Entry<Integer, Integer> entry : equipmentQuantityMap.entrySet()) {
                Integer equipmentId = entry.getKey();
                Integer quantity = entry.getValue();

                MedicalEquipment equipment = medicalEqupimentService.findById(equipmentId);

                if (equipment != null) {
                    equipment.setQuantity(equipment.getQuantity() - quantity);
                    medicalEqupimentService.save(equipment);
                }
            }

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("isaisanovicNNBA@gmail.com");
            mailMessage.setTo(mailUser.getEmail());
            mailMessage.setSubject("Confirmation of taking over reserved equipment");
            mailMessage.setText("Appointment number: " + updatedSlot.getId() +
                    "\nAppointment date: " + updatedSlot.getDateTime() +
                    "\nDelivered by: " + updatedSlot.getCompanyAdministrator().getUser().getName() + " " + updatedSlot.getCompanyAdministrator().getUser().getLastName() +
                    "\n\nEquipment successfully delivered!" +
                    "\nThank you for using our services." +
                    "\n\nSincerely, HospitalHub");
            emailService.sendEmail(mailMessage);

            return new ResponseEntity<>(updatedSlot, HttpStatus.OK);
        } else {
            return new ResponseEntity("Appointment status: PICKED UP", HttpStatus.OK);
        }
    }

}


