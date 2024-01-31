package HospitalHub.demo.repository;

import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.EquipmentAvailability;
import HospitalHub.demo.model.EquipmentContract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EquipmentContractRepository extends JpaRepository<EquipmentContract, Integer> {

    List<EquipmentContract> findAll();

    EquipmentContract save(EquipmentContract equipmentContract);

    EquipmentContract getById(Integer id);
    Optional<EquipmentContract> findByActiveTrue();

    List<EquipmentContract> findByCompanyId(Integer id);

}
