package HospitalHub.demo.service;

import HospitalHub.demo.model.SystemAdministrator;
import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.SystemAdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SystemAdministratorService {

    @Autowired
    public SystemAdministratorRepository systemAdministratorRepository;
    @Autowired
    private UserService userService;

    public SystemAdministrator save(SystemAdministrator systemAdministrator){
        return systemAdministratorRepository.save(systemAdministrator);
    }

    public SystemAdministrator makeUserSystemAdministrator(Integer userId) {
        // Check if the user is already a system administrator
        if (isUserSystemAdministrator(userId)) {
            // You can handle this case based on your requirements, throw an exception, return null, etc.
            // For now, let's return null.
            return null;
        }

        // Get the user by ID
        User user = userService.getById(userId);

        // Create a new SystemAdministrator and set its fields
        SystemAdministrator systemAdministrator = new SystemAdministrator();
        systemAdministrator.setId(user.getId());

        //Integer maxSysAdminId = systemAdministratorRepository.findMaxSysAdminId();
        //systemAdministrator.setSysAdminId(maxSysAdminId != null ? maxSysAdminId + 1 : 1);

        // Save the new SystemAdministrator
        return systemAdministratorRepository.save(systemAdministrator);
    }


    public List<SystemAdministrator> findAll(){
        return systemAdministratorRepository.findAll();
    }

    public boolean isUserSystemAdministrator(Integer id){
        return systemAdministratorRepository.existsById(id);
    }

}
