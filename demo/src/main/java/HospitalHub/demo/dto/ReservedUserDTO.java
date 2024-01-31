package HospitalHub.demo.dto;

import HospitalHub.demo.model.User;

public class ReservedUserDTO {
    private Integer userId;
    private String username;
    private String name;
    private String lastName;

    public ReservedUserDTO(User user) {
        this.userId = user.getId();
        this.username = user.getUsername();
        this.name = user.getName();
        this.lastName = user.getLastName();
    }
}
