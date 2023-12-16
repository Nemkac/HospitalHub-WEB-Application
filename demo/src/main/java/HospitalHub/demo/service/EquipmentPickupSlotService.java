package HospitalHub.demo.service;

import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.EquipmentPickupSlot;
import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.EquipmentPickupSlotRepository;
import HospitalHub.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class EquipmentPickupSlotService {

    @Autowired
    private EquipmentPickupSlotRepository equipmentPickupSlotRepository;
    @Autowired
    private UserRepository userRepository;

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

    public List<EquipmentPickupSlot> getAllUsersSlots(Integer userId){
        List<EquipmentPickupSlot> allSlots = equipmentPickupSlotRepository.findAll();
        List<EquipmentPickupSlot> foundSlots = new ArrayList<>();
        for(EquipmentPickupSlot slot: allSlots) {
            if(slot.getReservedBy()!=null && slot.getReservedBy().getId() == userId){
                foundSlots.add(slot);
            }
        }
        return foundSlots;
    }

    public Integer getNumberOfUserSlots(Integer userId){
        List<EquipmentPickupSlot> allSlots = equipmentPickupSlotRepository.findAll();
        Integer counter = 0;
        for(EquipmentPickupSlot slot: allSlots) {
            if(slot.getReservedBy()!=null && slot.getReservedBy().getId() == userId){
                counter++;
            }
        }
        return counter;
    }

    public EquipmentPickupSlot saveSlotByUser(EquipmentPickupSlot slot){
        return equipmentPickupSlotRepository.save(slot);
    }

    public EquipmentPickupSlot saveSlotByUser(LocalDateTime time, Integer duration, CompanyAdministrator admin, User user) {
        return equipmentPickupSlotRepository.save(new EquipmentPickupSlot(time,duration,admin,user));
    }

    public List<EquipmentPickupSlot> getAll(){
        return equipmentPickupSlotRepository.findAll();
    }

    public EquipmentPickupSlot OccupyPredefinedSlot(EquipmentPickupSlot slot, Integer userId){
        User user = userRepository.getById(userId);
        slot.setReservedBy(user);
        return(equipmentPickupSlotRepository.save(slot));
    }

    public EquipmentPickupSlot occupyPredefinedSlot(EquipmentPickupSlot slot){
        return(equipmentPickupSlotRepository.save(slot));
    }

}
