package HospitalHub.demo.dto;

import HospitalHub.demo.model.MedicalEquipment;

public class MedicalEquipmentDTO {
    private Integer id;
    private String name;
    private String type;
    private String description;
    private Double price;

    public MedicalEquipmentDTO() {

    }

    public MedicalEquipmentDTO(MedicalEquipment medicalEquipment) {
        this(medicalEquipment.getName(), medicalEquipment.getType(), medicalEquipment.getDescription(), medicalEquipment.getPrice());
    }

    public MedicalEquipmentDTO(String name, String type, String description, Double price) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.price = price;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
