package HospitalHub.demo.service;

import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.EquipmentContract;
import HospitalHub.demo.repository.EquipmentContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EquipmentContractService {

    @Autowired
    private EquipmentContractRepository equipmentContractRepository;

    public List<EquipmentContract> findAll(){
        return equipmentContractRepository.findAll();
    }

    public EquipmentContract save(EquipmentContract equipmentContract){
        return equipmentContractRepository.save(equipmentContract);
    }

    public EquipmentContract getById(Integer id){
        return equipmentContractRepository.getById(id);
    }

    public List<EquipmentContract> getByCompanyId(Integer companyId) {
        // Implementiraj funkcionalnost za pronalaženje ugovora na osnovu ID-a kompanije
        return equipmentContractRepository.findByCompanyId(companyId);
    }
    public EquipmentContract createContract(EquipmentContract equipmentContract) {
        equipmentContract.setActive(true);
        return equipmentContractRepository.save(equipmentContract);
    }
    public List<EquipmentContract> getActiveByCompanyId(Integer companyId) {
        List<EquipmentContract> allContracts = getByCompanyId(companyId);
        return allContracts.stream()
                .filter(EquipmentContract::isActive)
                .collect(Collectors.toList());
    }
    public void deactivateContract(Integer contractId) {
        Optional<EquipmentContract> optionalContract = equipmentContractRepository.findById(contractId);
        optionalContract.ifPresent(contract -> {
            contract.setActive(false);
            equipmentContractRepository.save(contract);
        });
    }

    public List<EquipmentContract> getUsersContracts(Integer userId){
        List<EquipmentContract> foundContracts = new ArrayList<>();
        List<EquipmentContract> allContracts = equipmentContractRepository.findAll();
        for(EquipmentContract contract : allContracts) {
            if(contract.getUser().getId() == userId && contract.isActive()){
                foundContracts.add(contract);
            }
        }
        return foundContracts;
    }


}
