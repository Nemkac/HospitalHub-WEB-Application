package HospitalHub.demo.repository;

import HospitalHub.demo.model.MedicalEquipmentAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalEquipmentAvailabilityRepository extends JpaRepository<MedicalEquipmentAvailability, Integer> {

    MedicalEquipmentAvailability save(MedicalEquipmentAvailability medicalEquipmentAvailability);

}
