package HospitalHub.demo.publisher;
import HospitalHub.demo.dto.EquipmentContractDTO;
import HospitalHub.demo.model.EquipmentContract;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQEquipmentContractProducer {

    @Value("${spring.rabbitmq.template.exchange}")
    private String exchange;

    @Value("${spring.rabbitmq.template.routing-key-equipment-contract}")
    private String routingEquipmentContractKey;

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQEquipmentContractProducer.class);

    private RabbitTemplate rabbitTemplate;

    public RabbitMQEquipmentContractProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendEquipmentContract(EquipmentContractDTO contractDTO) {
        LOGGER.info(String.format("Equipment contract sent -> %s", contractDTO.toString()));
        rabbitTemplate.convertAndSend(exchange, routingEquipmentContractKey, contractDTO);
    }

    public void sendDeliveryNotification(EquipmentContract contract) {
        LOGGER.info(String.format("Delivery notification sent -> %s", contract.toString()));
        rabbitTemplate.convertAndSend(exchange, routingEquipmentContractKey, contract);
    }
}

