import { Component, HostListener, OnInit } from '@angular/core';
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
  username?: String = "LOGIN";
  token = localStorage.getItem('token');
  isTransparent: boolean = true;

  constructor(private router: Router,public user: UserService) {}

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
        this.username.toUpperCase();
        },(error) => {
          console.error('Error fetching user:', error);
      });
    } else {
      this.username = "LOGIN";
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
}
