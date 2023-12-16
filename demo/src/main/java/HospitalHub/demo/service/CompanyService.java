package HospitalHub.demo.service;

import HospitalHub.demo.model.*;
import HospitalHub.demo.repository.CompanyAdministratorRepository;
import HospitalHub.demo.repository.CompanyRepository;
import HospitalHub.demo.repository.EquipmentAvailabilityRepository;
import HospitalHub.demo.repository.EquipmentPickupSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private EquipmentAvailabilityRepository equipmentAvailabilityRepository;
    @Autowired
    private EquipmentPickupSlotRepository equipmentPickupSlotRepository;
    @Autowired
    private CompanyAdministratorRepository companyAdministratorRepository;

    public List<Company> findAll(){
        return companyRepository.findAll();
    }

    public Company save(Company company){
        return companyRepository.save(company);
    }

    public Optional<Company> findById(Integer id){
        return companyRepository.findById(id);
    }

    public Company getById(Integer id){
        return companyRepository.getById(id);
    }

    public List<Company>  getByName(String name) {return companyRepository.getALlByNameIgnoreCase(name);}
    public List<Company> getByCity(String city) {return companyRepository.getAllByCityIgnoreCase(city);}
    public List<Company> getByCountry(String country) {return companyRepository.getAllByCountryIgnoreCase(country);}
    public List<Company> getByAvgRate(Double avgRate) {
        List<Company> companies = new ArrayList<>();
        for (Company company:companyRepository.findAll()){
            if(company.getAvgRate() > avgRate){
                companies.add(company);
            }
        }
        return companies;
    }

    public List<Company> getFiltered(String name, String country, String city, Double avgRate){
        return companyRepository.getAllByNameContainingIgnoreCaseAndCountryContainingIgnoreCaseAndCityContainingIgnoreCaseAndAvgRateGreaterThanEqual(name,country,city,avgRate);
    }

    public Integer calculateCompanyId(){
        List<Company> companies = companyRepository.findAll();
        List<Integer> ids = new ArrayList<>();

        for(Company company : companies) {
            ids.add(company.getId());
        }

        Collections.sort(ids);

        if(!ids.isEmpty()){
            Integer freeId = ids.get(ids.size() - 1);
            return freeId;
        } else {
            return 0;
        }
    }

    public EquipmentAvailability getEquipmentAvailabilityByCompanyId(Integer companyId){
        List<EquipmentAvailability> availabilities = equipmentAvailabilityRepository.findAll();
        if(availabilities != null) {
            for (EquipmentAvailability availability : availabilities) {
                if (availability.getCompany().getId() == companyId) {
                    return availability;
                }
            }
        }
        return null;
    }

    public List<Termin> getCompaniesTakenPeriods(Integer CompanyId){
        EquipmentAvailability equipment = getEquipmentAvailabilityByCompanyId(CompanyId);
        if(equipment != null){
            return equipment.getTerminList();
        }
        return null;
    }

    public List<LocalDate> getAvailableDaysInFollowingTen(Integer CompanyId){
        List<LocalDate> freeDays = new ArrayList<>();
        for(int i = 0; i < 10; i++){
            freeDays.add(LocalDate.now().plusDays(i));
        }
        List<Termin> takenPeriods = getCompaniesTakenPeriods(CompanyId);
        if(takenPeriods != null) {
            for (Termin termin : takenPeriods) {
                // logika koja izbacuje dane iz liste slobodnih dana ukoliko je dan zauzet
            }
            return freeDays;
        }
        return  freeDays;
    }

    public Boolean isThereAvailableSlotsInDate(Integer CompanyId, LocalDate day){
        List<Termin> takenPeriods = getCompaniesTakenPeriods(CompanyId);
        // ista ona logika odozgo koja treba da proveri da li ima slobodnih termina u danu
        return true;
    }

    public List<EquipmentPickupSlot> getCompaniesPredefinedAvailableSlots(Integer companyId){
        List<CompanyAdministrator> admins = companyAdministratorRepository.findAll();
        List<EquipmentPickupSlot> foundSlots = new ArrayList<>();
        List<CompanyAdministrator> foundAdmins = new ArrayList<>();
        if(!admins.isEmpty()) {
            for (CompanyAdministrator admin : admins) {
                if (Objects.equals(admin.getCompany().getId(), companyId)) {
                    foundAdmins.add(admin);
                }
            }
        }
        if(!foundAdmins.isEmpty()) {
            for (CompanyAdministrator admin : foundAdmins) {
                for (EquipmentPickupSlot slot : admin.getEquipmentPickupSlots()) {
                    if (slot.getReservedBy() == null) {
                        foundSlots.add(slot);
                    }
                }
            }
        }
        return foundSlots;
    }




}
