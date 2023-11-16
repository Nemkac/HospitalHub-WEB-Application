package HospitalHub.demo.repository;

import HospitalHub.demo.model.MedicalEquipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalEquipmentRepository extends JpaRepository<MedicalEquipment, Integer> {

    MedicalEquipment save(MedicalEquipment medicalEquipment);
}
