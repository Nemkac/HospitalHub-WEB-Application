package HospitalHub.demo.repository;

import HospitalHub.demo.model.EquipmentAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface EquipmentAvailabilityRepository extends JpaRepository<EquipmentAvailability, Integer> {

    List<EquipmentAvailability> findAll();

}
