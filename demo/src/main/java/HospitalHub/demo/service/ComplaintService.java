package HospitalHub.demo.service;

import HospitalHub.demo.model.Complaint;
import HospitalHub.demo.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public Complaint save(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    public List<Complaint> findAll(){
        return complaintRepository.findAll();
    }

    public Complaint getById(Integer id) { return complaintRepository.getById(id); }
}
