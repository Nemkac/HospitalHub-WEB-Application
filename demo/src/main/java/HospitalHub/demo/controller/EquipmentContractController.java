package HospitalHub.demo.controller;

import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.EquipmentContract;
import HospitalHub.demo.model.MedicalEquipment;
import HospitalHub.demo.publisher.RabbitMQEquipmentContractProducer;
import HospitalHub.demo.service.CompanyService;
import HospitalHub.demo.service.EquipmentContractService;
import HospitalHub.demo.service.MedicalEqupimentService;
import HospitalHub.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "api/contract")
public class EquipmentContractController {

    @Autowired
    private EquipmentContractService equipmentContractService;

    @Autowired
    private UserService userService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private MedicalEqupimentService medicalEqupimentService;

    @Autowired
    private TaskScheduler taskScheduler;
    private RabbitMQEquipmentContractProducer rabbitMQEquipmentContractProducer;

    @GetMapping("/contractsbyCompany/{companyId}")
    public ResponseEntity<List<EquipmentContract>> getContractsByCompanyId(@PathVariable Integer companyId) {
        Company company = companyService.getById(companyId);
        if (company == null) {
            return ResponseEntity.notFound().build();
        }
        List<EquipmentContract> contracts = equipmentContractService.getByCompanyId(companyId);
        return ResponseEntity.ok(contracts);
    }

    @GetMapping("/activeContractsbyCompany/{companyId}")
    public ResponseEntity<List<EquipmentContract>> getActiveContractsByCompanyId(@PathVariable Integer companyId) {
        Company company = companyService.getById(companyId);
        if (company == null) {
            return ResponseEntity.notFound().build();
        }
        List<EquipmentContract> activeContracts = equipmentContractService.getActiveByCompanyId(companyId);
        return ResponseEntity.ok(activeContracts);
    }

    @PostMapping("/create/{companyId}/{userId}")
    public ResponseEntity<EquipmentContract> createContract(@RequestBody EquipmentContract contract, @PathVariable Integer companyId, @PathVariable Integer userId) {
        scheduleDeliveryNotification(contract);

        Company company = companyService.getById(companyId);
        if (company == null) {
            return ResponseEntity.notFound().build();
        }

        if(!checkIfDeliveryIsPossibile(contract, contract.getEquipmentType(), company)) {
            scheduleContractTerminationNotification(contract);
        }


        if (!isEquipmentTypeValid(contract.getEquipmentType(), company)) {
            return ResponseEntity.notFound().build();
        }

        if (checkDeliveryPossibility(contract, contract.getEquipmentType(), company)) {
            contract.setDeliveryPossible(true);
        } else {
            rabbitMQEquipmentContractProducer.sendDeliveryNotification(contract);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        contract.setCompany(company);
        contract.setUser(userService.getById(userId));
        EquipmentContract createdContract = equipmentContractService.createContract(contract);
        rabbitMQEquipmentContractProducer.sendEquipmentContract(createdContract);
        return new ResponseEntity<>(createdContract, HttpStatus.CREATED);
    }
    private void scheduleDeliveryNotification(EquipmentContract contract) {
        LocalDate deliveryDate = contract.getDeliveryDate();
        int dayOfMonth = deliveryDate.getDayOfMonth();

        taskScheduler.schedule(() -> sendDeliveryNotification(contract), new CronTrigger("0 21 17 " + dayOfMonth + " * *"));
    }

    private void scheduleContractTerminationNotification(EquipmentContract contract) {
        LocalDate deliveryDate = contract.getDeliveryDate();
        int dayOfMonth = deliveryDate.getDayOfMonth() - 3;
            taskScheduler.schedule(() -> sendContractTerminationNotification(contract), new CronTrigger("0 25 1 " + dayOfMonth + " * *"));
    }
    private void sendDeliveryNotification(EquipmentContract contract) {
        rabbitMQEquipmentContractProducer.sendDeliveryStartNotification(contract);
    }
    private void sendContractTerminationNotification(EquipmentContract contract) {
        rabbitMQEquipmentContractProducer.sendContractTerminationNotification(contract);
    }

    private boolean checkIfDeliveryIsPossibile(EquipmentContract contract, String equipmentType, Company company) {
        List<MedicalEquipment> companyEquipmentList = company.getMedicalEquipmentList();
        int totalAvailableQuantity = 0;

        for (MedicalEquipment equipment : companyEquipmentList) {
            if (equipment.getType().equalsIgnoreCase(equipmentType)) {
                totalAvailableQuantity = equipment.getQuantity();
                break;
            }
        }

        if (totalAvailableQuantity >= contract.getQuantity()) {
            contract.setDeliveryPossible(true);
            return true;
        } else {
            rabbitMQEquipmentContractProducer.sendDeliveryNotification(contract);
            equipmentContractService.deactivateContract(contract.getId());
            rabbitMQEquipmentContractProducer.sendContractTerminationNotification(contract);

            return false;
        }
    }
    private boolean checkDeliveryPossibility(EquipmentContract contract, String equipmentType, Company company) {
        List<MedicalEquipment> companyEquipmentList = company.getMedicalEquipmentList();
        int totalAvailableQuantity = 0;
        for (MedicalEquipment equipment : companyEquipmentList) {
            if (equipment.getType().equalsIgnoreCase(equipmentType)) {
                totalAvailableQuantity = equipment.getQuantity();
                break;
            }
        }

        if (totalAvailableQuantity >= contract.getQuantity()) {
            contract.setDeliveryPossible(true);
            return true;
        } else {
            return false;
        }
    }

    @PutMapping("/deactivate/{id}")
    public ResponseEntity<EquipmentContract> deactivateContract(@PathVariable Integer id) {
        EquipmentContract contract = equipmentContractService.getById(id);

        if (contract == null) {
            return ResponseEntity.notFound().build();
        }
        equipmentContractService.deactivateContract(id);
        rabbitMQEquipmentContractProducer.sendContractTerminationNotification(contract);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public EquipmentContractController(/*RabbitMQProducer rabbitMQProducer,*/ RabbitMQEquipmentContractProducer rabbitMQEquipmentContractProducer) {
        this.rabbitMQEquipmentContractProducer = rabbitMQEquipmentContractProducer;
    }
    private boolean isEquipmentTypeValid(String equipmentType, Company company) {
        List<MedicalEquipment> companyEquipmentList = company.getMedicalEquipmentList();

        for (MedicalEquipment equipment : companyEquipmentList) {
            if (equipment.getType().equalsIgnoreCase(equipmentType)) {
                return true;
            }
        }
        return false;
    }
}
