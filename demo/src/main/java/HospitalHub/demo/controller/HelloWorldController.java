package HospitalHub.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/helloWorld")
public class HelloWorldController {

    @GetMapping
    public ResponseEntity<String> loptatackaball(){

        return new ResponseEntity<>("Pozdrav", HttpStatus.OK);

    }
}
