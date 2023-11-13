package HospitalHub.demo.service;

import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
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

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Integer calculateUserId(){
        List<User> users = userRepository.findAll();
        List<Integer> ids = new ArrayList<>();

        for(User user : users) {
            ids.add(user.getId());
        }

        Collections.sort(ids);

        if(!ids.isEmpty()){
            Integer freeId = ids.get(ids.size() - 1);
            return freeId;
        } else {
            return 0;
        }
    }
}
