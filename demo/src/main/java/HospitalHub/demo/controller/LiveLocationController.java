package HospitalHub.demo.controller;

import HospitalHub.demo.dto.LiveLocationDTO;
import HospitalHub.demo.publisher.RabbitMQJsonProducer;
import HospitalHub.demo.publisher.RabbitMQProducer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/liveLocation")
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

    @PostMapping(value = "/publish/json")
    public ResponseEntity<LiveLocationDTO> sendJsonMessage(@RequestBody LiveLocationDTO liveLocationDTO){
        rabbitMQJsonProducer.sendJsonMessage(liveLocationDTO);
        return ResponseEntity.ok(liveLocationDTO);
    }

    /*@PostMapping(value = "/publish/json")
    public void sendJsonMessage(@RequestBody LiveLocationDTO liveLocationDTO){
        rabbitMQJsonProducer.sendJsonMessage(liveLocationDTO);
    }*/
}
