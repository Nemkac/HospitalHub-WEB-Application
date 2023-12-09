import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private geocoder: google.maps.Geocoder;

  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }

  getCoordinates(address: string): Observable<google.maps.LatLng> {
    return new Observable((observer: Observer<google.maps.LatLng>) => {
      this.geocoder.geocode({ 'address': address }, (results, status) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          const latLng = new google.maps.LatLng(location.lat(), location.lng());
          observer.next(latLng);
        } else {
          observer.error('Geocode was not successful for the following reason: ' + status);
        }
        observer.complete();
      });
    });
  }
}
