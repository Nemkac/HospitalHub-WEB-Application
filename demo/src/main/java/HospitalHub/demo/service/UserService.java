package HospitalHub.demo.service;

import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll(){
        return userRepository.findAll();
    }
    public User save(User user){
        return userRepository.save(user);
    }
    public User getById(Integer id){
        return userRepository.getById(id);
    }
}
