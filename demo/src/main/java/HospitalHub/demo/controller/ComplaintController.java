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
@RequestMapping(value = "/api/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @GetMapping(value = "/getAll")
    @PreAuthorize("hasAuthority('ROLE_SYSADMIN')")
    public ResponseEntity<List<Complaint>> getAllComplaints(){
        List<Complaint> complaints = complaintService.findAll();

        return new ResponseEntity<List<Complaint>>(complaints, HttpStatus.FOUND);
    }
}
