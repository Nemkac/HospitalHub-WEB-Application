package HospitalHub.demo.service;

import HospitalHub.demo.model.EquipmentPickupSlot;
import HospitalHub.demo.repository.EquipmentPickupSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class EquipmentPickupSlotService {

    @Autowired
    private EquipmentPickupSlotRepository equipmentPickupSlotRepository;

    public EquipmentPickupSlot save(EquipmentPickupSlot slot){
        return equipmentPickupSlotRepository.save(slot);
    }

    public ArrayList<LocalDate> GetAvailablePickUpDatesInFollowing10(Integer companyId){
        ArrayList<LocalDate> availableDates = new ArrayList<>();

        return availableDates;
    }

    public EquipmentPickupSlot getById(Integer id){
        return equipmentPickupSlotRepository.getById(id);
    }
}
