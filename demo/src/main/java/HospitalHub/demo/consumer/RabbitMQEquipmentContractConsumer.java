package HospitalHub.demo.consumer;
import HospitalHub.demo.dto.EquipmentContractDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
@Service
public class RabbitMQEquipmentContractConsumer {

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQEquipmentContractConsumer.class);

    @RabbitListener(queues = "equipmentContractJSON_queue")
    public void consumeEquipmentContract(EquipmentContractDTO contractDTO) {
        LOGGER.info(String.format("Notification received! -> %s", contractDTO.toString()));
    }
}
