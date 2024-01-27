import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterEvent } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/user';
import { faBell as fasBell } from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { ComplaintService } from 'src/app/services/complaint.service';
import { Complaint } from 'src/app/models/Complaint';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router,
              public userService: UserService,
              private cdr: ChangeDetectorRef,
              private complaintService: ComplaintService) {}

  protected username? =  this.userService.loggedInUser;
  protected userRole? = this.userService.loggedInUserRole;
  protected userId? = this.userService.loggedInUserId;

  complaints: Complaint[] = [];
  complaintsCount: number = 0;
  complaintsNotificationFlag = false;

  get loggedInUser(): String {
      return this.username as String;
  }
  set loggedInUser(user: String) {
      this.username = user;
  }
  //userRole: string = "ROLE_USER";
  token = localStorage.getItem('token');
  isTransparent: boolean = true;
  noNotification = farBell;
  notification = fasBell;
  notificationFlag = false;

  ngOnInit(): void {
    console.log(this.loggedInUser);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isTransparent = event.url === '/' || event.urlAfterRedirects === '/';
        console.log("provera");
        this.loggedInUser = this.userService.loggedInUser;
        this.userRole = this.userService.loggedInUserRole;
        this.userId = this.userService.loggedInUserId;
      }
    });

    if (this.token) {
			this.userService.getUserByToken(this.token).subscribe(
			  (user: User) => {
				this.userId = user.id;
        this.loggedInUser = user.username;
        this.userRole = user.roles;
        if(this.userRole === "ROLE_SYSADMIN"){
          this.getComplaintsNotificationFlag();
        }
        },(error) => {
          console.error('Error fetching user:', error);
      });
    }
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if(this.router.url === '/'){
      this.isTransparent = window.scrollY < 220;
    } else {
      this.isTransparent = false;
    }
  }

  logOut(){
    localStorage.clear();
    location.reload();
  }

  public getComplaintsNotificationFlag() : void{
    this.complaintService.getAllUnprocessedComplaints().subscribe(
      (response : Complaint[]) => {
        this.complaints = response;
        if(this.complaints.length === 0){
          this.complaintsCount = 0;
          this.complaintsNotificationFlag = false;
        } else {
          this.complaintsCount = this.complaints.length;
          this.complaintsNotificationFlag = true;
        }
      }
    )
  }
}
