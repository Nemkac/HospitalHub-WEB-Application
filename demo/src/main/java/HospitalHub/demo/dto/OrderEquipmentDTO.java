package HospitalHub.demo.dto;

public class OrderEquipmentDTO {

    private Integer id;

    private int[] equipmentIds;

    private Integer companyId;

    private Integer userId;
    private Integer pickupSlotId;
    public OrderEquipmentDTO() {
    }

    public OrderEquipmentDTO(Integer id, int[] equipmentIds, Integer companyId, Integer userId, Integer pickupSlotId) {
        this.id = id;
        this.equipmentIds = equipmentIds;
        this.companyId = companyId;
        this.userId = userId;
        this.pickupSlotId = pickupSlotId;
    }

    public Integer getPickupSlotId() {
        return pickupSlotId;
    }

    public void setPickupSlotId(Integer pickupSlotId) {
        this.pickupSlotId = pickupSlotId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int[] getEquipmentIds() {
        return equipmentIds;
    }

    public void setEquipmentIds(int[] equipmentIds) {
        this.equipmentIds = equipmentIds;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
