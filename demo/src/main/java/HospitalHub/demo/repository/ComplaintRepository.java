package HospitalHub.demo.repository;

import HospitalHub.demo.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
    Complaint save(Complaint complaint);
    List<Complaint> findAll();
    Complaint getById(Integer id);
}
