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

    public void sendEquipmentContract(EquipmentContract contract) {
        LOGGER.info(String.format("Equipment contract sent -> %s", contract.toString()));
        rabbitTemplate.convertAndSend(exchange, routingEquipmentContractKey, contract);
    }
    public void sendDeliveryNotification(EquipmentContract contract) {
        LOGGER.info(String.format("Delivery not possible notification sent -> %s", contract.toString()));
        rabbitTemplate.convertAndSend(exchange, routingEquipmentContractKey, contract);
    }
    public void sendDeliveryStartNotification(EquipmentContract contract) {
        LOGGER.info(String.format("Your scheduled equipment delivery just started -> %s", contract.toString()));
        rabbitTemplate.convertAndSend(exchange, routingEquipmentContractKey, contract);
    }
    public void sendDeliveryEndNotification(EquipmentContract contract) {
        LOGGER.info(String.format("The equipment has just been delivered -> %s", contract.toString()));
        rabbitTemplate.convertAndSend(exchange, routingEquipmentContractKey, contract);
    }
    public void sendContractTerminationNotification(EquipmentContract contract) {
        LOGGER.info(String.format("Contract is terminated -> %s", contract.toString()));
        rabbitTemplate.convertAndSend(exchange, routingEquipmentContractKey, contract);
    }
}

