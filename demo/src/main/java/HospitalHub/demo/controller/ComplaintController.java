package HospitalHub.demo.controller;

import HospitalHub.demo.dto.ComplaintDTO;
import HospitalHub.demo.dto.ReplyDTO;
import HospitalHub.demo.model.Complaint;
import HospitalHub.demo.service.ComplaintService;
import jakarta.transaction.Transactional;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;


    @GetMapping(value = "/getProcessed")
    public ResponseEntity<List<Complaint>> getAllProcessedComplaints(){
        List<Complaint> complaints = complaintService.findAll();
        List<Complaint> processedComplaints = new ArrayList<>();

        for(Complaint complaint : complaints){
            if(complaint.getReply() != null){
                processedComplaints.add(complaint);
            }
        }

        return new ResponseEntity<List<Complaint>>(processedComplaints, HttpStatus.OK);
    }

    @GetMapping(value = "/getUnprocessed")
    public ResponseEntity<List<Complaint>> getAllUnprocessedComplaints(){
        List<Complaint> complaints = complaintService.findAll();
        List<Complaint> unprocessedComplaints = new ArrayList<>();

        for(Complaint complaint : complaints){
            if(complaint.getReply() == null){
                unprocessedComplaints.add(complaint);
            }
        }

        return new ResponseEntity<List<Complaint>>(unprocessedComplaints, HttpStatus.OK);
    }

    @GetMapping(value = "/getComplaintById/{id}")
    public ResponseEntity<ComplaintDTO> getComplaintById(@PathVariable Integer id){
        Complaint complaint = complaintService.getById(id);
        ComplaintDTO dto = new ComplaintDTO(complaint);

        return new ResponseEntity<ComplaintDTO>(dto, HttpStatus.OK);
    }

    @PutMapping(value = "/reply/{id}")
    @Transactional
    public ResponseEntity<ComplaintDTO> reply(@PathVariable Integer id, @RequestBody ReplyDTO replyDTO){
        try{

            Complaint complaint = complaintService.getById(id);

            if (complaint == null) {
                return new ResponseEntity("Complaint not found", HttpStatus.NOT_FOUND);
            }

            if (complaint.getReply() != null) {
                return new ResponseEntity("Complaint already replied", HttpStatus.CONFLICT);
            }

            if (complaint.getVersion() != null && complaint.getVersion() >= 1) {
                return new ResponseEntity("Conflict. Someone else has replied. Please refresh and try again.", HttpStatus.CONFLICT);
            }

            complaint.setReply(replyDTO.getReply());
            complaint.setReplyDate(replyDTO.getReplyDate());
            complaint.setRepliedBy(replyDTO.getRepliedBy());
            complaintService.save(complaint);

            ComplaintDTO dto = new ComplaintDTO(complaint);

            return new ResponseEntity<>(dto, HttpStatus.OK);

        } catch (Exception e){
            return new ResponseEntity(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<Complaint>> getAllComplaints(){
        List<Complaint> complaints = complaintService.findAll();
        List<ComplaintDTO> dtos = new ArrayList<>();

        for(Complaint complaint : complaints){
            ComplaintDTO dto = new ComplaintDTO(complaint);
            dtos.add(dto);
        }

        return new ResponseEntity<List<Complaint>>(complaints, HttpStatus.OK);
    }
}
