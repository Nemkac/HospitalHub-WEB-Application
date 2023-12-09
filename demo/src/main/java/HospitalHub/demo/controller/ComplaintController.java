package HospitalHub.demo.controller;

import HospitalHub.demo.dto.ComplaintDTO;
import HospitalHub.demo.model.Complaint;
import HospitalHub.demo.service.ComplaintService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    /*
        TODO: Dodati boolean controller koji proverava da li je otvorena zalba odgovorena ili ne.
         Na osnovu toga videti da li se prikazuje polje za dodavanje odgovora na zalbu ili ne.
    */

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

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<Complaint>> getAllComplaints(){
        /*try{
            List<Complaint> complaints = complaintService.findAll();
            List<ComplaintDTO> dtos = new ArrayList<>();

            for(Complaint complaint : complaints){
                ComplaintDTO dto = new ComplaintDTO(complaint);
                dtos.add(dto);
            }

            return new ResponseEntity<List<ComplaintDTO>>(dtos, HttpStatus.FOUND);
        } catch (Exception e){
            return new ResponseEntity(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }*/
        List<Complaint> complaints = complaintService.findAll();
        List<ComplaintDTO> dtos = new ArrayList<>();

        for(Complaint complaint : complaints){
            ComplaintDTO dto = new ComplaintDTO(complaint);
            dtos.add(dto);
        }

        return new ResponseEntity<List<Complaint>>(complaints, HttpStatus.OK);
    }
}
