import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back-to-top-button',
  templateUrl: './back-to-top-button.component.html',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(100%)'
      })),
      transition('void <=> *', animate('0.4s ease-in-out')),
    ])
  ]
})
export class BackToTopButtonComponent implements OnInit {
  faArrowUp = faArrowUp;
  isShow: boolean = false;

  ngOnInit(): void {}

  scrollToTop(): void {
    const currentPosition = window.scrollY;
    const step = Math.floor(currentPosition / 20); // Adjust the division factor for a smoother scroll
  
    function scrollToTopStep() {
      if (window.scrollY > 0) {
        window.scrollTo(0, window.scrollY - step);
        window.requestAnimationFrame(scrollToTopStep);
      }
    }
  
    window.requestAnimationFrame(scrollToTopStep);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isShow = window.scrollY > 500;
  }
}
