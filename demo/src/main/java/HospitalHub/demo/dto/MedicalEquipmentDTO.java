package HospitalHub.demo.dto;

import HospitalHub.demo.model.MedicalEquipment;

public class MedicalEquipmentDTO {
    private Integer id;
    private String name;
    private String type;
    private String description;
    private Double price;
    private String image;
    private Integer quantity;

    public MedicalEquipmentDTO() {

    }

    public MedicalEquipmentDTO(MedicalEquipment medicalEquipment) {
        this(medicalEquipment.getName(), medicalEquipment.getType(), medicalEquipment.getDescription(), medicalEquipment.getPrice(), medicalEquipment.getImage());
    }

    public MedicalEquipmentDTO(String name, String type, String description, Double price, String image) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.price = price;
        this.image = image;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
