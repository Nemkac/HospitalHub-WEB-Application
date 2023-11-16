package HospitalHub.demo.service;

import HospitalHub.demo.model.MedicalEquipment;
import HospitalHub.demo.repository.MedicalEquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedicalEqupimentService {

    @Autowired
    private MedicalEquipmentRepository medicalEquipmentRepository;

    public MedicalEquipment save(MedicalEquipment medicalEquipment){
        return medicalEquipmentRepository.save(medicalEquipment);
    }
}
