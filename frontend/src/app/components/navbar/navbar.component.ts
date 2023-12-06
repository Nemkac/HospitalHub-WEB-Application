import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterEvent } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  userId : number | undefined;
  username?: string = "LOGIN";
  userRole: string = "ROLE_USER";
  token = localStorage.getItem('token');
  isTransparent: boolean = true;

  constructor(private router: Router,
              public user: UserService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isTransparent = event.url === '/' || event.urlAfterRedirects === '/';
      }
    });

    if (this.token) {
			this.user.getUserByToken(this.token).subscribe(
			  (user: User) => {
				this.userId = user.id;
        this.username = user.username;
        this.userRole = user.roles;
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
}
