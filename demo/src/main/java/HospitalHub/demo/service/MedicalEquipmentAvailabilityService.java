package HospitalHub.demo.service;

import HospitalHub.demo.model.MedicalEquipmentAvailability;
import HospitalHub.demo.repository.MedicalEquipmentAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedicalEquipmentAvailabilityService {

    @Autowired
    private MedicalEquipmentAvailabilityRepository medicalEquipmentAvailabilityRepository;

    public MedicalEquipmentAvailability save(MedicalEquipmentAvailability medicalEquipmentAvailability){
        return medicalEquipmentAvailabilityRepository.save(medicalEquipmentAvailability);
    }

}
