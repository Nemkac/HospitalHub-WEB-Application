package HospitalHub.demo.service;

import HospitalHub.demo.dto.UserRegisterDTO;
import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User getById(Integer id){
        return userRepository.getById(id);
    }

    public User save(User user){
        return userRepository.save(user);
    }

    public User findByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username);
    }

    public boolean checkData(UserRegisterDTO userRegisterDto){

        if(userRegisterDto.getDateOfBirth().isAfter(LocalDate.now())){
            return false;
        }
        // dodati da li je jedinstven email
        // dodati da li se sifre poklapaju.
        return true;
    }
}
