import { Component } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pricing-page',
  templateUrl: './pricing-page.component.html'
})
export class PricingPageComponent {
  faCheck = faCheck;
}
