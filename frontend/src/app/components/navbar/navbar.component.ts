import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  isTransparent: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isTransparent = event.url === '/' || event.urlAfterRedirects === '/';
      }
    });
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
