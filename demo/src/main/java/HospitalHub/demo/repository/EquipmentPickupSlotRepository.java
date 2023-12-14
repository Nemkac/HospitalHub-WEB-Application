package HospitalHub.demo.repository;

import HospitalHub.demo.model.EquipmentPickupSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentPickupSlotRepository extends JpaRepository<EquipmentPickupSlot, Integer> {

    //EquipmentPickupSlot save(EquipmentPickupSlot slot);
    //List<EquipmentPickupSlot> getAllByCompanyAdministrator(Integer id);

}
