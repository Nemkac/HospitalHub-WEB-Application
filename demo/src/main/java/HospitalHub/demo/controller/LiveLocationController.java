package HospitalHub.demo.controller;

import HospitalHub.demo.dto.LiveLocationDTO;
import HospitalHub.demo.publisher.RabbitMQJsonProducer;
import HospitalHub.demo.publisher.RabbitMQProducer;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class LiveLocationController {

    //private RabbitMQProducer rabbitMQProducer;

    private RabbitMQJsonProducer rabbitMQJsonProducer;

    public LiveLocationController(/*RabbitMQProducer rabbitMQProducer,*/ RabbitMQJsonProducer rabbitMQJsonProducer) {
        //this.rabbitMQProducer = rabbitMQProducer;
        this.rabbitMQJsonProducer = rabbitMQJsonProducer;
    }

    /*@GetMapping(value = "/publish")
    public ResponseEntity<String> sendMessage(@RequestParam("message") String message){
        rabbitMQProducer.sendMessage(message);
        return ResponseEntity.ok("Message sent to RabbitMQ ...");
    }*/
    @PostMapping(value = "/api/liveLocation/publish/json")
    //@CrossOrigin(origins = "http://localhost:4200/")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<String> sendJsonMessage(@RequestBody LiveLocationDTO liveLocationDTO){
        rabbitMQJsonProducer.sendJsonMessage(liveLocationDTO);
        return ResponseEntity.ok("Json message sent to RabbitMQ ...");
    }
}
