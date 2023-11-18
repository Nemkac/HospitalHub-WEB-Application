package HospitalHub.demo.controller;

import HospitalHub.demo.dto.MedicalEquipmentDTO;
import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.MedicalEquipment;
import HospitalHub.demo.service.CompanyService;
import HospitalHub.demo.service.MedicalEqupimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        List<MedicalEquipmentDTO> dtos = new ArrayList<MedicalEquipmentDTO>();

        for(Company company : companies){
            /*company.getMedicalEquipmentList().forEach(equipment -> {
                equipment.setCompany(null);
            });*/
            List<MedicalEquipment> equipments = company.getMedicalEquipmentList();
            for(MedicalEquipment eq : equipments){
                MedicalEquipmentDTO dto = new MedicalEquipmentDTO(eq.getName(), eq.getType(), eq.getDescription());
                dtos.add(dto);
            }
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}
