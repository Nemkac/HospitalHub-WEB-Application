package HospitalHub.demo.controller;

import HospitalHub.demo.dto.SystemAdministratorDTO;
import HospitalHub.demo.model.SystemAdministrator;
import HospitalHub.demo.model.User;
import HospitalHub.demo.service.SystemAdministratorService;
import HospitalHub.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/profile")
public class SystemAdministratorController {

    @Autowired
    public SystemAdministratorService systemAdministratorService;


    /*
        Treba dodati funkcionalnost dodavanja novog administratora kompanije. Otvaram stranicu za prikaz kompanije.
        Na njoj imam vidljive informacije o kompaniji i o tome ko je zaduzen za nju. Ako niko nije zaduzen, biram nekog iz
        liste ponudjenih usera. Tog usera dodajem kao novog companyAdmina, stavljam polje "companyAdministrator" za tu
        kompaniju na izabranog usera, a polje "company" u izabranom useru stavljam na tu kompaniju. Kada izaberem usera,
        pravim novog sistem admina od njega i kompanije na kojoj se nalazim.
        -> Prikaz kompanije (getById)
        -> Odabir jednog usera iz liste (findAll za usere pa findByEmail posto ce biti unique email)
        -> Cuvanje odabranog usera u promenljivu selectedUser
        -> Kreiranje companyUsera od selectedUsera i kompanije na kojoj se nalazim (createNew za companyAdmina i findById za kompaniju)
    */
}
