import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-request-delivery-page',
  templateUrl: './request-delivery-page.component.html',
  styleUrls: ['./request-delivery-page.component.css']
})
export class RequestDeliveryPageComponent implements OnInit{
	@ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

	faLocation = faLocation;
	faLocationDot = faLocationDot;
	
	ngOnInit(): void {
		this.loadMap()
	}

    loadMap() {
        const map = L.map(this.mapContainer.nativeElement).setView(
			[45.267136, 19.833549],
			12
		  );  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    }
}
