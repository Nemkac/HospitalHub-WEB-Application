package HospitalHub.demo.repository;

import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.EquipmentAvailability;
import HospitalHub.demo.model.EquipmentPickupSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public interface EquipmentPickupSlotRepository extends JpaRepository<EquipmentPickupSlot, Integer> {


    EquipmentPickupSlot save(EquipmentPickupSlot slot);
    //List<EquipmentPickupSlot> getAllByCompanyAdministrator(Integer id);
    EquipmentPickupSlot getById(Integer id);

    List<EquipmentPickupSlot> findAll();
    List<EquipmentPickupSlot> getAllByCompanyAdministrator(CompanyAdministrator companyAdministrator);
    default Optional<EquipmentPickupSlot> getByEquipmentIdAndReserved(Integer equipmentId) {
        List<EquipmentPickupSlot> allSlots = findAll();

        for (EquipmentPickupSlot slot : allSlots) {
            boolean isEquipmentReserved = containsEquipmentId(slot.getEquipment(), equipmentId);
            boolean isReservedByNotNull = slot.getReservedBy() != null;
            boolean isDateTimeBeforeNow = slot.getDateTime().isBefore(LocalDateTime.now().plusMinutes(slot.getDuration()));

            System.out.println("Slot ID: " + slot.getId());
            System.out.println("Is Equipment Reserved: " + isEquipmentReserved);
            System.out.println("Is Reserved By Not Null: " + isReservedByNotNull);
            System.out.println("Is DateTime Before Now: " + isDateTimeBeforeNow);

            if (isEquipmentReserved && isReservedByNotNull && isDateTimeBeforeNow) {
                return Optional.of(slot);
            }

            // Dodajte dodatnu proveru za buduće termine
            boolean isFutureReservation = containsEquipmentId(slot.getEquipment(), equipmentId) &&
                    slot.getReservedBy() != null &&
                    slot.getDateTime().isAfter(LocalDateTime.now());

            if (isFutureReservation) {
                // Ovde možete postaviti odgovarajuću logiku ili baciti izuzetak
                System.out.println("Equipment is reserved in the future and cannot be deleted.");
                return Optional.empty();
            }
        }

        return Optional.empty();
    }

    private boolean containsEquipmentId(int[] equipment, Integer equipmentId) {
        if (equipment != null) {
            for (int eqId : equipment) {
                if (eqId == equipmentId) {
                    return true;
                }
            }
        }
        return false;
    }

}
