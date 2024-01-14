package HospitalHub.demo.consumer;

import HospitalHub.demo.dto.LiveLocationDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQJsonConsumer {

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQJsonConsumer.class);

    @RabbitListener(queues = "liveLocationJSON_queue")
    public void consumeJsonMessage(LiveLocationDTO liveLocationDTO){
        LOGGER.info(String.format("Received JSON message -> %s", liveLocationDTO.toString()));
    }
}
