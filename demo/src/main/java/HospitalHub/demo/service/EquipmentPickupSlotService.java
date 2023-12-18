package HospitalHub.demo.service;

import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.EquipmentPickupSlot;
import HospitalHub.demo.model.MedicalEquipment;
import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.CompanyAdministratorRepository;
import HospitalHub.demo.repository.CompanyRepository;
import HospitalHub.demo.repository.EquipmentPickupSlotRepository;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EquipmentPickupSlotService {

    @Autowired
    private EquipmentPickupSlotRepository equipmentPickupSlotRepository;
    @Autowired
    private CompanyService companyService;
    @Autowired
    private CompanyAdministratorRepository companyAdministratorRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private MedicalEqupimentService medicalEqupimentService;

    public EquipmentPickupSlot save(EquipmentPickupSlot slot) {
        if (isSlotBeforeNow(slot) || !isSlotWithinCompanyWorkingHours(slot)) {
            return null;
        }
        if (isSlotOverlapping(slot)) {
            return null;
        }
        return equipmentPickupSlotRepository.save(slot);
    }

    public List<EquipmentPickupSlot> getAll(){
        return equipmentPickupSlotRepository.findAll();
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
    public boolean isSlotOverlappingWithAny(EquipmentPickupSlot newSlot, Integer companyId) {
        List<EquipmentPickupSlot> companySlots = companyService.getCompaniesSlots(companyId);

        for (EquipmentPickupSlot slot : companySlots) {
            if (areSlotsOverlapping(newSlot, slot)) {
                return true;
            }
        }
        return false;
    }

    public EquipmentPickupSlot saveExtraSlot(EquipmentPickupSlot slot, Integer companyId, Integer userId) {
        if (isSlotBeforeNow(slot) /*|| !isSlotWithinCompanyWorkingHours(slot)*/) {
            return null;
        }
        if (isSlotOverlappingWithAny(slot, companyId)) {
            return null;
        }
        List<CompanyAdministrator> admins = companyAdministratorRepository.findAll();
        List<CompanyAdministrator> foundAdmins = new ArrayList<>();
        if(!admins.isEmpty()) {
            for (CompanyAdministrator admin : admins) {
                if (Objects.equals(admin.getCompany().getId(), companyId)) {
                    foundAdmins.add(admin);
                }
            }
        }
        if(!foundAdmins.isEmpty()) {
            slot.setReservedBy(userService.getById(userId));
            slot.setCompanyAdministrator(foundAdmins.get(0));
            return equipmentPickupSlotRepository.save(slot);
        }
        return  null;
    }

    public List<MedicalEquipment> getEquipmentsFromIds(int[] ids){
        List<MedicalEquipment> equipments = new ArrayList<>();
        for(int id : ids){
            equipments.add(medicalEqupimentService.getEquipmentById(id));
        }
        return equipments;
    }


}
