import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare var google: any;

@Component({
  selector: 'app-show-coordinates',
  standalone: true,
  imports: [],
  templateUrl: './show-coordinates.component.html',
  styleUrls: ['./show-coordinates.component.scss']
})
export class ShowCoordinatesComponent implements OnInit {
  @Input() latitude: string | undefined;
  @Input() longitude: string | undefined;
  @Input() title: string | undefined;
  @Output() close = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ShowCoordinatesComponent>) {}
  

  ngOnInit(): void {
    this.latitude = this.data.latitude;
    this.longitude = this.data.longitude;
    this.title = this.data.title;
    this.loadMap();
  }

  loadMap() {
    if (this.latitude && this.longitude) {
      // Initialize Google Maps with the provided latitude and longitude
      const mapOptions = {
        center: { lat: parseFloat(this.latitude), lng: parseFloat(this.longitude) },
        zoom: 10, // Set the initial zoom level (adjust as needed)
        styles: this.getCustomMapStyles(),
      };
      const map = new google.maps.Map(document.getElementById('map')!, mapOptions); // Ensure you have a div with id="map" in your HTML
      new google.maps.Marker({
        position: mapOptions.center,
        map: map,
        title: this.title,
        icon: this.getCustomMarkerIcon()
      });

      // Close button click event
      const closeBtn = document.querySelector('.close-button') as HTMLElement;
      closeBtn.addEventListener('click', () => {
        this.closeDialog();
      });
    } else {
      console.error('Latitude or longitude is not provided.');
    }
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
  closeDialog(): void {
    this.dialogRef.close();
  }
}
