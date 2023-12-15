package HospitalHub.demo.service;

import HospitalHub.demo.model.EquipmentPickupSlot;
import HospitalHub.demo.repository.EquipmentPickupSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.util.ArrayList;
import java.util.List;

@Service
public class EquipmentPickupSlotService {

    @Autowired
    private EquipmentPickupSlotRepository equipmentPickupSlotRepository;

    public EquipmentPickupSlot save(EquipmentPickupSlot slot){
        return equipmentPickupSlotRepository.save(slot);
    }

    /*public List<EquipmentPickupSlot> getAdminsSlots(Integer id){
        return equipmentPickupSlotRepository.getAllByCompanyAdministrator(id);
    }*/

    public ArrayList<LocalDate> GetAvailablePickUpDatesInFollowing10(Integer companyId){
        ArrayList<LocalDate> availableDates = new ArrayList<>();




        return availableDates;
    }
}
