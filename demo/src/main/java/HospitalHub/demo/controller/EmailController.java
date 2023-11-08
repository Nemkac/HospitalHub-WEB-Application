package HospitalHub.demo.controller;

import HospitalHub.demo.model.User;
import HospitalHub.demo.repository.EmailConfirmationTokenRepository;
import HospitalHub.demo.repository.UserRepository;
import HospitalHub.demo.service.EmailService;
import HospitalHub.demo.token.EmailConfirmationToken;
import javassist.Loader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class EmailController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailConfirmationTokenRepository emailConfirmationTokenRepository;

    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/register",method = RequestMethod.GET)
    public ModelAndView displayRegistration(ModelAndView modelAndView, User user)
    {
        modelAndView.addObject("user",user);
        modelAndView.setViewName("register");
        return modelAndView;
    }

    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public ModelAndView registerUser(ModelAndView modelAndView, User user)
    {
        //Za sada samo ovo ispod mi treba
        EmailConfirmationToken confirmationToken = new EmailConfirmationToken(user);
        emailConfirmationTokenRepository.save(confirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setFrom("YOUR EMAIL ADDRESS");
        mailMessage.setText("To confirm your account, please click here : "
                +"http://localhost:8081/confirm-account?token="+confirmationToken.getConfirmationToken());

        emailService.sendEmail(mailMessage);
        modelAndView.addObject("emailId",user.getEmail());
        modelAndView.setViewName("successfulRegistration");

        return modelAndView;
    }


    @RequestMapping(value="/confirm-account",method = {RequestMethod.GET,RequestMethod.POST})
    public ModelAndView confirmUserAccount(ModelAndView modelAndView, @RequestParam("token")String confirmationToken)
    {
        EmailConfirmationToken token = emailConfirmationTokenRepository.findByConfirmationToken(confirmationToken);
        if(token != null)
        {
            User user = userRepository.findByEmailIgnoreCase(token.getUser().getEmail());
            user.setEnabled(true);
            userRepository.save(user);
            modelAndView.setViewName("accountVerified");
        }
        else
        {
            modelAndView.addObject("message","The link is invalid or broken!");
            modelAndView.setViewName("error");
        }

        return modelAndView;
    }

    }





