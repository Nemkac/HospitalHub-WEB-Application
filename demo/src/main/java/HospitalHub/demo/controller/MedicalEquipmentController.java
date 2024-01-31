package HospitalHub.demo.controller;

import HospitalHub.demo.dto.*;
import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.EquipmentPickupSlot;
import HospitalHub.demo.model.MedicalEquipment;
import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.EquipmentPickupSlotRepository;
import HospitalHub.demo.repository.MedicalEquipmentRepository;
import HospitalHub.demo.repository.UserRepository;
import HospitalHub.demo.service.*;
import ch.qos.logback.core.net.SyslogOutputStream;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.io.ByteSource;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import jakarta.activation.DataSource;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@RestController
@RequestMapping(value = "api/equipment")
public class MedicalEquipmentController {

    @Autowired
    private MedicalEqupimentService medicalEqupimentService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private EquipmentPickupSlotService equipmentPickupSlotService;

    @Autowired
    private EquipmentPickupSlotRepository slotRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private EquipmentPickupSlotRepository equipmentPickupSlotRepository;
    @Autowired
    private MedicalEquipmentRepository medicalEquipmentRepository;

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<MedicalEquipmentDTO>> getAllEquipment(){
        List<Company> companies = companyService.findAll();
        List<MedicalEquipmentDTO> dtos = new ArrayList<>();

        for(Company company : companies){
            List<MedicalEquipment> equipments = company.getMedicalEquipmentList();
            for(MedicalEquipment eq : equipments){
                MedicalEquipmentDTO dto = new MedicalEquipmentDTO(eq.getName(), eq.getType(), eq.getDescription(), eq.getPrice(), eq.getImage());
                dtos.add(dto);
            }
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @DeleteMapping("/deleteEquipment/{equipmentId}")
    public ResponseEntity<MedicalEquipment> deleteEquipment(@PathVariable Integer equipmentId) {
        List<EquipmentPickupSlot> slots = equipmentPickupSlotService.getAll();

        for (EquipmentPickupSlot slot : slots) {
            int[] equipmentIds = slot.getEquipment();

            if (equipmentIds != null) {
                for (int id : equipmentIds) {
                    if (id == equipmentId) {
                        if (slot.getDateTime().isBefore(LocalDateTime.now())) {
                            medicalEqupimentService.deleteById(equipmentId);
                            return new ResponseEntity<>(HttpStatus.OK);
                        } else {
                            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                        }
                    }
                }
            }
        }
        medicalEqupimentService.deleteById(equipmentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(consumes = "application/json", value = "/updateEquipment/{equipmentId}")
    public ResponseEntity<MedicalEquipment> updateEquipment(@PathVariable Integer equipmentId, @RequestBody MedicalEquipmentDTO equipmentDTO) {
        MedicalEquipment existingEquipment = medicalEqupimentService.findById(equipmentId);

        if (existingEquipment != null) {
            if (equipmentDTO.getName() != null && !equipmentDTO.getName().isEmpty()) {
                existingEquipment.setName(equipmentDTO.getName());
            }
            if (equipmentDTO.getType() != null && !equipmentDTO.getType().isEmpty()) {
                existingEquipment.setType(equipmentDTO.getType());
            }
            if (equipmentDTO.getDescription() != null && !equipmentDTO.getDescription().isEmpty()) {
                existingEquipment.setDescription(equipmentDTO.getDescription());
            }
            if (equipmentDTO.getPrice() != null) {
                existingEquipment.setPrice(equipmentDTO.getPrice());
            }
            if (equipmentDTO.getImage() != null && !equipmentDTO.getImage().isEmpty()) {
                existingEquipment.setImage(equipmentDTO.getImage());
            }
            if (equipmentDTO.getQuantity() != null) {
                existingEquipment.setQuantity(equipmentDTO.getQuantity());
            }
            medicalEqupimentService.save(existingEquipment);

            return new ResponseEntity<>(existingEquipment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(consumes = "application/json", value = "/addEquipment/{companyId}")
    public ResponseEntity<MedicalEquipment> addEquipment(@RequestBody MedicalEquipmentDTO equipmentDTO, @PathVariable Integer companyId) {
        try {
            Company company = companyService.getById(companyId);
            MedicalEquipment newEquipment = new MedicalEquipment(
                    equipmentDTO.getName(),
                    equipmentDTO.getType(),
                    equipmentDTO.getDescription(),
                    company,
                    equipmentDTO.getPrice(),
                    equipmentDTO.getImage(),
                    equipmentDTO.getQuantity()
            );

            MedicalEquipment savedEquipment = medicalEqupimentService.save(newEquipment);

            return new ResponseEntity<>(savedEquipment, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{id}/{version}")
    @Transactional
    public ResponseEntity<MedicalEquipment> getEquipmentById(@PathVariable Integer id,@PathVariable Long version) {
        MedicalEquipment equipment = medicalEqupimentService.getEquipmentById(id);

        if (equipment != null) {
            if(version != -1) {
                if (!equipment.getVersion().equals(version)) {
                    return new ResponseEntity<>(equipment, HttpStatus.CONFLICT);
                }
            }
            return new ResponseEntity<>(equipment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/combinedSearch")
    public ResponseEntity<SearchEquipmentDTO> combinedSearch(
            @RequestParam(required = false)String name,
            @RequestParam(required = false)Double minPrice,
            @RequestParam(required = false)Double maxPrice,
            @RequestParam(required = false)String type
    ){
        String searchName,searchType;
        Double filterMinPrice, filterMaxPrice;
        if(name == null){ searchName = "";} else {searchName = name;}
        if(type == null){ searchType = "";} else {searchType = type;}
        if(minPrice == 0.0){ filterMinPrice = 0.0;} else {filterMinPrice = minPrice;}
        if(maxPrice == 0.0){ filterMaxPrice = 2000.0;} else {filterMaxPrice = maxPrice;}

        List<MedicalEquipment> equipments = medicalEqupimentService.combinedSearching(searchName, filterMinPrice, filterMaxPrice, searchType);

        List<MedicalEquipmentDTO> DTOs = new ArrayList<>();
        List<CompanyDTO> companyDTOs = new ArrayList<>();

        for(MedicalEquipment eq : equipments){
            Company company = eq.getCompany();
            CompanyDTO companyDTO = new CompanyDTO(company);
            if(!companyDTOs.contains(companyDTO)){
                companyDTOs.add(companyDTO);
            }
            MedicalEquipmentDTO dto = new MedicalEquipmentDTO(eq.getName(), eq.getType(), eq.getDescription(), eq.getPrice(), eq.getImage());
            DTOs.add(dto);
        }

        SearchEquipmentDTO response = new SearchEquipmentDTO(DTOs, companyDTOs);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "/orderEquipment")
    @Transactional
    public ResponseEntity<EquipmentPickupSlot> orderEquipment(@RequestBody OrderEquipmentDTO orderEquipmentDTO,@RequestParam Long version){

        Optional<EquipmentPickupSlot> slot = slotRepository.findById(orderEquipmentDTO.getPickupSlotId());
        EquipmentPickupSlot foundSlot = new EquipmentPickupSlot();
        List<MedicalEquipment> equipment = medicalEqupimentService.findAllById(orderEquipmentDTO.getEquipmentIds());

        if(slot.isPresent()){
            foundSlot = slot.get();
        }

        if(!version.equals(foundSlot.getVersion())){
            return new ResponseEntity<>(foundSlot,HttpStatus.CONFLICT);
        }

       /* for(MedicalEquipment medEq : equipment){
            if(!medEq.getVersion().equals(orderEquipmentDTO.getVersionIds().get(medEq.getId()))){
                return new ResponseEntity<>(foundSlot,HttpStatus.CONFLICT);
            }
        }
        
        */

        Optional<User> user = userRepository.findById(orderEquipmentDTO.getUserId());
        User mailUser = new User();
        if(user.isPresent()){
            foundSlot.setReservedBy(user.get());
            mailUser = user.get();
        }

        foundSlot.setEquipment(orderEquipmentDTO.getEquipmentIds());

        EquipmentPickupSlot check = slotRepository.save(foundSlot);

        for(MedicalEquipment equ : equipment){
            equ.setVersion(equ.getVersion() + 1);
            medicalEquipmentRepository.save(equ);
        }

        String namesOfEquipment = new String();
        for(MedicalEquipment x : equipment){
            namesOfEquipment += x.getName() +","+ " ";
        }
        String qrMessage = foundSlot.getId() + "\n" +
                            mailUser.getName() + " " + mailUser.getLastName() +"\n" +
                            namesOfEquipment + "\n" +
                            foundSlot.getDateTime() + "\n" +
                            foundSlot.getDuration();
        File image = new File("QRIMG.png");
        try {
            image = QRCodeGenerator.generateQRCodeImage(qrMessage, 250, 250);

        }catch(WriterException | IOException e){
            e.printStackTrace();
        }
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true);
            helper.setFrom("isaisanovicNNBA@gmail.com");
            helper.setTo(mailUser.getEmail());
            helper.setSubject("Order information!");
            helper.addAttachment("QRDetails",image);
            helper.setText("Details regarding your order!");
            mailSender.send(mimeMessage);

        }catch (Exception e){
            e.printStackTrace();
        }
        image.delete();
        return new ResponseEntity<>(foundSlot, HttpStatus.OK);
    }


    @PostMapping("/cancelAppointment")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<CancellAppointmentDTO> cancelAppointment(@RequestBody CancellAppointmentDTO cancellAppointmentDTO){
        EquipmentPickupSlot slot = equipmentPickupSlotService.getById(cancellAppointmentDTO.getAppointmentId());
        User user = userRepository.getById(cancellAppointmentDTO.getUserId());
        slot.setReservedBy(null);
        if(slot.getDateTime().isBefore(LocalDateTime.now().minus(24, ChronoUnit.HOURS))){
            user.setPenaltyPoints(user.getPenaltyPoints()+2);
        }else{
            user.setPenaltyPoints(user.getPenaltyPoints()+1);
        }

        userRepository.save(user);
        equipmentPickupSlotRepository.save(slot);
        return new ResponseEntity<>(cancellAppointmentDTO,HttpStatus.OK);
    }
}
