package HospitalHub.demo.service;

import HospitalHub.demo.model.EquipmentPickupSlot;
import HospitalHub.demo.repository.EquipmentPickupSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EquipmentPickupSlotService {

    @Autowired
    private EquipmentPickupSlotRepository equipmentPickupSlotRepository;

    public EquipmentPickupSlot save(EquipmentPickupSlot slot) {
        if (isSlotBeforeNow(slot) || !isSlotWithinCompanyWorkingHours(slot)) {
            return null;
        }
        if (isSlotOverlapping(slot)) {
            return null;
        }
        return equipmentPickupSlotRepository.save(slot);
    }

    public boolean isSlotWithinCompanyWorkingHours(EquipmentPickupSlot slot) {
        LocalTime openingTime = slot.getCompanyAdministrator().getCompany().getOpeningTime();
        LocalTime closingTime = slot.getCompanyAdministrator().getCompany().getClosingTime();
        LocalTime slotStartTime = slot.getDateTime().toLocalTime();

        return !slotStartTime.isBefore(openingTime) && !slotStartTime.isAfter(closingTime);
    }
    public boolean isSlotBeforeNow(EquipmentPickupSlot slot) {
        LocalDateTime now = LocalDateTime.now();
        return slot.getDateTime().isBefore(now);
    }

    public boolean isSlotOverlapping(EquipmentPickupSlot newSlot) {
        List<EquipmentPickupSlot> existingSlots = equipmentPickupSlotRepository.getAllByCompanyAdministrator(newSlot.getCompanyAdministrator());

        for (EquipmentPickupSlot existingSlot : existingSlots) {
            if (areSlotsOverlapping(newSlot, existingSlot)) {
                return true;
            }
        }
        return false;
    }

    private boolean areSlotsOverlapping(EquipmentPickupSlot slot1, EquipmentPickupSlot slot2) {
        LocalDateTime start1 = slot1.getDateTime();
        LocalDateTime end1 = start1.plusMinutes(slot1.getDuration());

        LocalDateTime start2 = slot2.getDateTime();
        LocalDateTime end2 = start2.plusMinutes(slot2.getDuration());

        return start1.isBefore(end2) && end1.isAfter(start2);

    }

    /*public List<EquipmentPickupSlot> getAdminsSlots(Integer id){
        return equipmentPickupSlotRepository.getAllByCompanyAdministrator(id);
    }*/

    public ArrayList<LocalDate> GetAvailablePickUpDatesInFollowing10(Integer companyId){
        ArrayList<LocalDate> availableDates = new ArrayList<>();

        return availableDates;
    }

    public EquipmentPickupSlot getById(Integer id){
        return equipmentPickupSlotRepository.getById(id);
    }
}
