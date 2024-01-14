import { LiveLocation } from './../../models/LiveLocation';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import 'leaflet-routing-machine';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/company';
import { RequestDeliveryService } from 'src/app/services/request-delivery.service';
import { RabbitmqLiveLocationService } from 'src/app/services/rabbitmq-live-location.service';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-request-delivery-page',
  templateUrl: './request-delivery-page.component.html',
})
export class RequestDeliveryPageComponent implements OnInit{
	@ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

	companyId! : number;
	selectedCompany: Company | undefined;
	@Input() companyLatitude: number = 0; 
	@Input() companyLongitude: number = 0; 

	faLocation = faLocation;
	faLocationDot = faLocationDot;

	startLocation: L.LatLng | null = null;
	map : L.Map | null = null;
	destinationMarker: L.Marker | null = null
	destinationLatitude: number = 0;
	destinationLongitude: number = 0;
	destinationAddress: string = '';
	

	constructor(private route: ActivatedRoute,
				private companyService: CompanyService,
				private requestDeliveryService: RequestDeliveryService,
				private rabbitmeLiveLocationService: RabbitmqLiveLocationService,
				private toast: NgToastService) {} 

	ngOnInit(): void {
		const idFromRoute = this.route.snapshot.paramMap.get('id');
		if(idFromRoute != null) {
			this.companyId =+ idFromRoute
			this.getCompanyData();
		}
	}

	public getCompanyData() : void{
		this.companyService.getCompany(this.companyId).subscribe(
		  (response:Company) => {
			this.selectedCompany = response;
			this.companyLatitude = response.latitude; 
			this.companyLongitude = response.longitude;
			console.log(this.selectedCompany);
			this.loadMap();
		  },
		  (error) => {
			console.error('Error fetching company data.', error);
		  }
		);
	  }

	///STARO SA LEAFLET
	loadMap() {
		this.map = L.map(this.mapContainer.nativeElement).setView(
			[this.companyLatitude, this.companyLongitude],
			12
		);
		L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: "OSM"}).addTo(this.map);
		
		var deliveryTruckIcon = L.icon({
			iconUrl:'../../../assets/logotip-blue.png',
			iconSize: [50, 40]
		})
		var marker = L.marker([this.companyLatitude, this.companyLongitude], {icon: deliveryTruckIcon}).addTo(this.map);
		
		this.map.on('click', (e) => {
			if(this.destinationMarker === null){
				this.destinationLatitude = e.latlng.lat;
				this.destinationLongitude = e.latlng.lng;
				this.destinationMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map!);
				L.Routing.control({
					waypoints: [
						L.latLng(this.companyLatitude, this.companyLongitude),
						L.latLng([e.latlng.lat, e.latlng.lng])
					]
				}).on('routesfound', (e) => {
					console.log(e);
					const lastRoute = e.routes[e.routes.length - 1];
					const lastStep = lastRoute.instructions[lastRoute.instructions.length - 1];
					this.destinationAddress = lastStep.road;
					const routeCoordinates = e.routes[0].coordinates;
					let index = 0;
					const intervalId = setInterval(() => {
						if (index < routeCoordinates.length) {
							const currentCoordinate = routeCoordinates[index];
							this.sendCoordinateToRabbitMQ(currentCoordinate.lat, currentCoordinate.lng);
							marker.setLatLng([currentCoordinate.lat, currentCoordinate.lng]);
							index++;
						} else {
							clearInterval(intervalId);
							this.toast.success({detail:"Equipment delivered", summary:"If the equipment was damaged during transport, please contact us by email."})	
						}
					}, 1000);
				})
				.addTo(this.map!);
			}
		});
	}

	sendCoordinateToRabbitMQ(latitude: number, longitude: number): void{
		const liveLocation : LiveLocation = {
			latitude: latitude,
			longitude: longitude,
		};

		this.rabbitmeLiveLocationService.sendLiveLocationMessage(liveLocation).subscribe();
	}
}
