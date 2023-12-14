package HospitalHub.demo.controller;

import HospitalHub.demo.dto.CompanyDTO;
import HospitalHub.demo.dto.MedicalEquipmentDTO;
import HospitalHub.demo.dto.OrderEquipmentDTO;
import HospitalHub.demo.dto.SearchEquipmentDTO;
import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.EquipmentPickupSlot;
import HospitalHub.demo.model.MedicalEquipment;
import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.EquipmentPickupSlotRepository;
import HospitalHub.demo.repository.UserRepository;
import HospitalHub.demo.service.CompanyService;
import HospitalHub.demo.service.MedicalEqupimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "api/equipment")
public class MedicalEquipmentController {

    @Autowired
    private MedicalEqupimentService medicalEqupimentService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private EquipmentPickupSlotRepository slotRepository;
    @Autowired
    private UserRepository userRepository;

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
    public ResponseEntity<String> orderEquipment(@RequestBody OrderEquipmentDTO orderEquipmentDTO){

        Optional<EquipmentPickupSlot> slot = slotRepository.findById(orderEquipmentDTO.getPickupSlotId());
        EquipmentPickupSlot foundSlot = new EquipmentPickupSlot();

        if(slot.isPresent()){
            foundSlot = slot.get();
        }
        Optional<User> user = userRepository.findById(orderEquipmentDTO.getUserId());
        if(user.isPresent()){
            foundSlot.setReservedBy(user.get());
        }

        foundSlot.setEquipment(orderEquipmentDTO.getEquipmentIds());
        EquipmentPickupSlot check = slotRepository.save(foundSlot);
        if(check != null){
            return new ResponseEntity<>("Slot izmenjen", HttpStatus.OK);
        }
        return new ResponseEntity<>("Slot nije izmenjen", HttpStatus.NOT_ACCEPTABLE);
    }


}
