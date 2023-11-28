package HospitalHub.demo.dto;

import HospitalHub.demo.model.Company;

import java.util.List;

public class SearchEquipmentDTO {
    public List<MedicalEquipmentDTO> equipmentDTOList;
    public List<CompanyDTO> companies;

    public SearchEquipmentDTO(List<MedicalEquipmentDTO> equipmentDTOList, List<CompanyDTO> companies) {
        this.equipmentDTOList = equipmentDTOList;
        this.companies = companies;
    }

    public List<MedicalEquipmentDTO> getEquipmentDTOList() {
        return equipmentDTOList;
    }

    public void setEquipmentDTOList(List<MedicalEquipmentDTO> equipmentDTOList) {
        this.equipmentDTOList = equipmentDTOList;
    }

    public List<CompanyDTO> getCompanies() {
        return companies;
    }

    public void setCompanies(List<CompanyDTO> companies) {
        this.companies = companies;
    }
}
