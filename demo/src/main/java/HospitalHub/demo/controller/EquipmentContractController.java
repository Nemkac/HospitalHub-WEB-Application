package HospitalHub.demo.controller;

import HospitalHub.demo.dto.EquipmentContractDTO;
import HospitalHub.demo.dto.LiveLocationDTO;
import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.EquipmentContract;
import HospitalHub.demo.model.MedicalEquipment;
import HospitalHub.demo.publisher.RabbitMQEquipmentContractProducer;
import HospitalHub.demo.publisher.RabbitMQJsonProducer;
import HospitalHub.demo.service.CompanyService;
import HospitalHub.demo.service.EquipmentContractService;
import HospitalHub.demo.service.MedicalEqupimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/contract")
public class EquipmentContractController {

    @Autowired
    private EquipmentContractService equipmentContractService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private MedicalEqupimentService medicalEqupimentService;

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

    @PostMapping("/create/{companyId}")
    public ResponseEntity<EquipmentContract> createContract(@RequestBody EquipmentContract contract, @PathVariable Integer companyId) {
        Company company = companyService.getById(companyId);
        if (company == null) {
            return ResponseEntity.notFound().build();
        }

        if (!isEquipmentTypeValid(contract.getEquipmentType(), company)) {
            return ResponseEntity.notFound().build();
        }

        // Check and set delivery
        if (checkDeliveryPossibility(contract, contract.getEquipmentType(), company)) {
            contract.setDeliveryPossible(true);
        } else {
            // If delivery is not possible, send an asynchronous message
            rabbitMQEquipmentContractProducer.sendDeliveryNotification(contract);
        }

        contract.setCompany(company);
        EquipmentContract createdContract = equipmentContractService.createContract(contract);

        return new ResponseEntity<>(createdContract, HttpStatus.CREATED);
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

        System.out.println("Total Available Quantity: " + totalAvailableQuantity);
        System.out.println("Contract Quantity: " + contract.getQuantity());

        if (totalAvailableQuantity >= contract.getQuantity()) {
            contract.setDeliveryPossible(true);
            return true;
        } else {
            // Ako isporuka nije moguća, obavestite korisnika ili proizvedite poruku za dalje korake.
            rabbitMQEquipmentContractProducer.sendDeliveryNotification(contract);
            return false;
        }
    }



    private int getAvailableQuantityForDelivery(EquipmentContract contract) {
        // Retrieve the medical equipment associated with the contract
        List<MedicalEquipment> medicalEquipmentList = getMedicalEquipmentByTypeAndCompany(contract.getEquipmentType(), contract.getCompany());

        if (!medicalEquipmentList.isEmpty()) {
            // Assuming available quantity is the minimum of the contract quantity and actual equipment quantity
            return Math.min(medicalEquipmentList.get(0).getQuantity(), contract.getQuantity());
        }

        return 0; // Return 0 if medical equipment is not found (adjust as needed)
    }

    private List<MedicalEquipment> getMedicalEquipmentByTypeAndCompany(String equipmentType, Company company) {
        // Implement logic to retrieve medical equipment by type and company
        // You can use your data/service to fetch this information
        // For now, let's assume a placeholder value, replace this with your actual logic
        return medicalEqupimentService.findByTypeAndCompany(equipmentType, company);
    }

    @PutMapping("/deactivate/{id}")
    public ResponseEntity<Void> deactivateContract(@PathVariable Integer id) {
        equipmentContractService.deactivateContract(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public EquipmentContractController(/*RabbitMQProducer rabbitMQProducer,*/ RabbitMQEquipmentContractProducer rabbitMQEquipmentContractProducer) {
        this.rabbitMQEquipmentContractProducer = rabbitMQEquipmentContractProducer;
    }


    @PostMapping(value = "/publish/json")
    public ResponseEntity<String> sendJsonMessage(@RequestBody EquipmentContractDTO equipmentContractDTO) {
        rabbitMQEquipmentContractProducer.sendEquipmentContract(equipmentContractDTO);
        return ResponseEntity.ok("Json message sent to RabbitMQ ...");
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
