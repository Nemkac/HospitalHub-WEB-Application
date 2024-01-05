package HospitalHub.demo.service;

import HospitalHub.demo.model.MedicalEquipment;
import HospitalHub.demo.repository.MedicalEquipmentRepository;
import com.google.common.primitives.Ints;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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
    public MedicalEquipment findById(Integer id) {
        Optional<MedicalEquipment> equipmentOptional = medicalEquipmentRepository.findById(id);
        return equipmentOptional.orElse(null);
    }
    public MedicalEquipment getEquipmentById(Integer id) {
        return medicalEquipmentRepository.findById(id).orElse(null);
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

    public List<MedicalEquipment> combinedSearching(String name, Double minPrice, Double maxPrice, String type){
        return medicalEquipmentRepository.getAllByNameContainingIgnoreCaseAndPriceGreaterThanEqualAndPriceLessThanEqualAndTypeContainingIgnoreCase(name, minPrice, maxPrice, type);
    }

    public void deleteById(Integer equipmentId) {
        medicalEquipmentRepository.deleteById(equipmentId);
    }

    public List<MedicalEquipment> findAllById(int[] ids){
        List<Integer> integers = Ints.asList(ids);
        return medicalEquipmentRepository.findAllById(integers);
    }

    public MedicalEquipment getById(Integer id){
        return medicalEquipmentRepository.getById(id);
    }


}
