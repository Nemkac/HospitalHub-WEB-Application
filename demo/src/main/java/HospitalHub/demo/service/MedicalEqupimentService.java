package HospitalHub.demo.service;

import HospitalHub.demo.model.MedicalEquipment;
import HospitalHub.demo.repository.MedicalEquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalEqupimentService {

    @Autowired
    private MedicalEquipmentRepository medicalEquipmentRepository;

    public MedicalEquipment save(MedicalEquipment medicalEquipment){
        return medicalEquipmentRepository.save(medicalEquipment);
    }

    public List<MedicalEquipment> findAll() {
        return medicalEquipmentRepository.findAll();
    }

    public List<MedicalEquipment> searchByEquipmentName(String searchTerm) {
        return medicalEquipmentRepository.findByNameContainingIgnoreCase(searchTerm);
    }

    public List<MedicalEquipment> filterByType(String filterTerm){
        return medicalEquipmentRepository.findByType(filterTerm);
    }

    public List<MedicalEquipment> filterByPriceRange(Double minPrice, Double maxPrice){
        return medicalEquipmentRepository.findByPriceBetween(minPrice, maxPrice);
    }

}
