package HospitalHub.demo.controller;

import HospitalHub.demo.dto.LiveLocationDTO;
import HospitalHub.demo.publisher.RabbitMQJsonProducer;
import HospitalHub.demo.publisher.RabbitMQProducer;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class LiveLocationController {

    private RabbitMQJsonProducer rabbitMQJsonProducer;

    public LiveLocationController(RabbitMQJsonProducer rabbitMQJsonProducer) {
        //this.rabbitMQProducer = rabbitMQProducer;
        this.rabbitMQJsonProducer = rabbitMQJsonProducer;
    }


    @PostMapping(value = "/api/liveLocation/publish/json")
    @CrossOrigin(origins = "http://localhost:4200")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<LiveLocationDTO> sendJsonMessage(@RequestBody LiveLocationDTO liveLocationDTO){
        rabbitMQJsonProducer.sendJsonMessage(liveLocationDTO);
        return new ResponseEntity(liveLocationDTO, HttpStatus.OK);
    }

}
