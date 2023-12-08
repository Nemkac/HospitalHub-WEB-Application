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
        TODO: Preurediti endpoint tako da vraca samo one na koje postoji odgovor.
         Dodati jos jedan endpoint koji vraca sve one na koje ne postoji odgovor.
         Kada admin dodje na stranicu za zalbe prikazuju mu se sve na koje ne postoji odgovor.
         Ako nema nijedne, prikazuje mu poruku "Nothing to show" i link "View processed complaints".
         Klikom na link prikazuju mu se sve na koje postoji odgovor.
         Na njih nije moguce odgovoriti. Mogu se samo pregledati.
    */

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
