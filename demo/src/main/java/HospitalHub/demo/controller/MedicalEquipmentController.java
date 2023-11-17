package HospitalHub.demo.controller;

import HospitalHub.demo.model.MedicalEquipment;
import HospitalHub.demo.service.MedicalEqupimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/equipment")
public class MedicalEquipmentController {

    @Autowired
    private MedicalEqupimentService medicalEqupimentService;

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<MedicalEquipment>> getAllEquipment(){
        List<MedicalEquipment> equipments = medicalEqupimentService.findAll();

        return new ResponseEntity<>(equipments, HttpStatus.FOUND);
    }
}
