package HospitalHub.demo.repository;

import HospitalHub.demo.model.MedicalEquipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalEquipmentRepository extends JpaRepository<MedicalEquipment, Integer> {

    MedicalEquipment save(MedicalEquipment medicalEquipment);
    List<MedicalEquipment> findAll();
    List<MedicalEquipment> findByNameContainingIgnoreCase(String searchTerm);
    List<MedicalEquipment> findByType(String filterTerm);
    List<MedicalEquipment> findByPriceBetween(Double minPrice, Double maxPrice);
    List<MedicalEquipment> getAllByNameContainingIgnoreCaseAndPriceGreaterThanEqualAndPriceLessThanEqualAndTypeContainingIgnoreCase(String name, Double minPrice, Double maxPrice, String type);
}
