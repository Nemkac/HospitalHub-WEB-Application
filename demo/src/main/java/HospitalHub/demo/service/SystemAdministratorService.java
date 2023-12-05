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

    public List<SystemAdministrator> findAll(){
        return systemAdministratorRepository.findAll();
    }

    public SystemAdministrator getByUser(User user){
        return systemAdministratorRepository.getByUser(user);
    }

}
