import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Depot } from '../../core/depot.model';
import { GoogleMapsLoaderService } from '../../core/googlemapLoader.service';


declare var google: any;

@Component({
  selector: 'app-add-depot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'add-depot.component.html',
  styleUrl: 'add-depot.component.scss'
})
export class AddDepotComponent implements OnInit{

  constructor(private googleMapsLoaderService: GoogleMapsLoaderService) {}

  @Output() close = new EventEmitter<void>();
  @Output() addDepot= new EventEmitter<Depot>();

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.googleMapsLoaderService.loadGoogleMapsAPI()
      .then(() => {
        this.loadMap();
      })
      .catch(error => {
        console.error(error);
      });
  }

  depot: Depot = {
    depot_id: '',
    name: '',
    phone_number: '',
    full_address: '', 
    latitude: '',
    longitude: ''
  }

  onMapClick(event: any) {
    console.log(event.coords)
    this.depot.latitude = event.coords.lat;
    this.depot.longitude = event.coords.lng;
  }

  addNewDepot() { 
    this.addDepot.emit(this.depot);
    this.close.emit();
  }
  map: any;
  marker: any;
  loadMap() {
      // Initialize Google Maps with the provided latitude and longitude
      const mapOptions = {
        center: { lat: 33.787368, lng: -7.157286 },
        zoom: 5, // Set the initial zoom level (adjust as needed)
        styles: this.getCustomMapStyles(),
        disableDefaultUI: true,
        gestureHandling: "none" ,
        fullscreenControl: true 
      };
      this.map = new google.maps.Map(document.getElementById('map')!, mapOptions); // Ensure you have a div with id="map" in your HTML
      this.marker  = new google.maps.Marker({
        position: mapOptions.center,
        map: this.map,
        title: "choosen place",
        icon: this.getCustomMarkerIcon()
      });
      google.maps.event.addListener(this.map, 'click', (event: any) => {
        this.placeMarker(event.latLng);
      });
  }

  placeMarker(location: any) {
    this.marker.setPosition(location);
    this.updateDepotLocation(location);
  }

  updateDepotLocation(location: any) {
    this.depot.latitude = location.lat();
    this.depot.longitude = location.lng();
  }

  getCustomMapStyles() {
    return [
      {
          "featureType": "all",
          "elementType": "labels.text",
          "stylers": [
              {
                  "color": "#878787"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f9f5ed"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f5f5f5"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#c9c9c9"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#aee0f4"
              }
          ]
      }
  ];
  }
  getCustomMarkerIcon() {
    const svgIcon = `
    <svg width="50" height="60" viewBox="0 0 24 30" fill="#000" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 10C8.13 10 5 13.13 5 17C5 20.74 9.19 24.51 11.47 28.32C11.74 28.78 12.26 28.78 12.53 28.32C14.81 24.51 19 20.74 19 17C19 13.13 15.87 10 12 10ZM12 19.5C10.62 19.5 9.5 18.38 9.5 17C9.5 15.62 10.62 14.5 12 14.5C13.38 14.5 14.5 15.62 14.5 17C14.5 18.38 13.38 19.5 12 19.5Z"/>
    </svg>
  `;
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgIcon)}`,
      scaledSize: new google.maps.Size(50, 60)
    };
  }
}
