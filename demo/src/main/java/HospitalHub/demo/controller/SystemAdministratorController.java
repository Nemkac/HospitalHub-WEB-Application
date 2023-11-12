package HospitalHub.demo.controller;

import HospitalHub.demo.dto.SystemAdministratorDTO;
import HospitalHub.demo.model.Company;
import HospitalHub.demo.model.CompanyAdministrator;
import HospitalHub.demo.model.SystemAdministrator;
import HospitalHub.demo.model.User;
import HospitalHub.demo.service.CompanyAdministratorService;
import HospitalHub.demo.service.CompanyService;
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
    @Autowired
    public CompanyService companyService;
    @Autowired
    public CompanyAdministratorService companyAdministratorService;

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

    @PutMapping(value = "/makeAdmin")
    public ResponseEntity<Company> setCompanyAdministrator(@RequestBody Integer companyAdministratorId){
        List<Company> companies = this.companyService.findAll();
        Company selectedCompany = new Company();

        for(Company company : companies){
            int selectedCompanyId = company.getId();

            if(selectedCompanyId == 1){
                selectedCompany = company;
            }
        }

        CompanyAdministrator companyAdmin = this.companyAdministratorService.getById(companyAdministratorId);

        selectedCompany.setCompanyAdministrator(companyAdmin);

        return new ResponseEntity<Company>(selectedCompany, HttpStatus.ACCEPTED);
    }
}
