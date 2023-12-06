import { Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-complaints-page',
  templateUrl: './complaints-page.component.html',
})
export class ComplaintsPageComponent {
  faTrash = faTrash;
}
