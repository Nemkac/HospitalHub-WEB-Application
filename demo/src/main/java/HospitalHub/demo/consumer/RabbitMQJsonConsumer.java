package HospitalHub.demo.consumer;

import HospitalHub.demo.dto.LiveLocationDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.WebSocketStompClient;

@Service
public class RabbitMQJsonConsumer {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private WebSocketStompClient stompClient;

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQJsonConsumer.class);

    @Autowired
    public RabbitMQJsonConsumer(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    /*@RabbitListener(queues = "liveLocationJSON_queue")
    public void consumeJsonMessage(LiveLocationDTO liveLocationDTO){
        LOGGER.info(String.format("Received JSON message -> %s", liveLocationDTO.toString()));
    }*/

    @RabbitListener(queues = "liveLocationJSON_queue")
    public void consumeJsonMessage(LiveLocationDTO liveLocationDTO){
        LOGGER.info(String.format("Received JSON message -> %s", liveLocationDTO.toString()));

        simpMessagingTemplate.convertAndSend("/topic/liveLocation", liveLocationDTO);
    }
}
