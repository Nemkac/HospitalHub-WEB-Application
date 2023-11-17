import { Component } from '@angular/core';
import { faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-equipment-page',
  templateUrl: './equipment-page.component.html',
})
export class EquipmentPageComponent {
  faSearch = faSearch;
}
