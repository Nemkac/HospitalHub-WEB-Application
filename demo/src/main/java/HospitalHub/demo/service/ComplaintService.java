package HospitalHub.demo.service;

import HospitalHub.demo.model.Complaint;
import HospitalHub.demo.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public Complaint save(Complaint complaint) {
        return complaintRepository.save(complaint);
    }
}
