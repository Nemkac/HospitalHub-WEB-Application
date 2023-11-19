package HospitalHub.demo.controller;

import HospitalHub.demo.dto.MedicalEquipmentDTO;
import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.MedicalEquipment;
import HospitalHub.demo.service.CompanyService;
import HospitalHub.demo.service.MedicalEqupimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/equipment")
public class MedicalEquipmentController {

    @Autowired
    private MedicalEqupimentService medicalEqupimentService;

    @Autowired
    private CompanyService companyService;

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<MedicalEquipmentDTO>> getAllEquipment(){
        List<Company> companies = companyService.findAll();
        List<MedicalEquipmentDTO> dtos = new ArrayList<>();

        for(Company company : companies){
            /*company.getMedicalEquipmentList().forEach(equipment -> {
                equipment.setCompany(null);
            });*/
            List<MedicalEquipment> equipments = company.getMedicalEquipmentList();
            for(MedicalEquipment eq : equipments){
                MedicalEquipmentDTO dto = new MedicalEquipmentDTO(eq.getName(), eq.getType(), eq.getDescription(), eq.getPrice());
                dtos.add(dto);
            }
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping(value = "/getBySearchParameters")
    public ResponseEntity<List<MedicalEquipmentDTO>> getEquipmentBySearchParameters(@RequestParam String equipmentName){
        List<MedicalEquipment> equipments = medicalEqupimentService.searchByEquipmentName(equipmentName);
        List<MedicalEquipmentDTO> dtos = new ArrayList<>();

        for(MedicalEquipment equipment : equipments){
            MedicalEquipmentDTO dto = new MedicalEquipmentDTO(equipment.getName(), equipment.getType(), equipment.getDescription(), equipment.getPrice());
            dtos.add(dto);
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping(value = "/filterByType")
    public ResponseEntity<List<MedicalEquipmentDTO>> filterByType (@RequestParam String selectedType){
        List<MedicalEquipment> equipments = medicalEqupimentService.filterByType(selectedType);
        List<MedicalEquipmentDTO> dtos = new ArrayList<>();

        for(MedicalEquipment equipment : equipments){
            MedicalEquipmentDTO dto = new MedicalEquipmentDTO(equipment.getName(), equipment.getType(), equipment.getDescription(), equipment.getPrice());
            dtos.add(dto);
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping(value = "/filterByPriceRange")
    public ResponseEntity<List<MedicalEquipmentDTO>> filterByPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice
    ){
        List<MedicalEquipment> equipments;

        if(minPrice > 0 && maxPrice > 0 && maxPrice > minPrice) {
            equipments = medicalEqupimentService.filterByPriceRange(minPrice, maxPrice);
        }
        else if(minPrice > maxPrice){
            equipments = new ArrayList<>();
        } else {
            equipments = medicalEqupimentService.findAll();
        }

        List<MedicalEquipmentDTO> dtos = new ArrayList<>();

        for(MedicalEquipment equipment : equipments){
            MedicalEquipmentDTO dto = new MedicalEquipmentDTO(equipment.getName(), equipment.getType(), equipment.getDescription(), equipment.getPrice());
            dtos.add(dto);
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

}
