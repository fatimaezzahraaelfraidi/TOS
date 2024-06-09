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
  @Output() close = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ShowCoordinatesComponent>) {}
  

  ngOnInit(): void {
    this.latitude = this.data.latitude;
    this.longitude = this.data.longitude;
    this.loadMap();
  }

  loadMap() {
    if (this.latitude && this.longitude) {
      // Initialize Google Maps with the provided latitude and longitude
      const mapOptions = {
        center: { lat: parseFloat(this.latitude), lng: parseFloat(this.longitude) },
        zoom: 15 // Set the initial zoom level (adjust as needed)
      };
      const map = new google.maps.Map(document.getElementById('map')!, mapOptions); // Ensure you have a div with id="map" in your HTML
      new google.maps.Marker({
        position: mapOptions.center,
        map: map,
        title: 'Depot Location'
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

  closeDialog(): void {
    this.dialogRef.close();
  }
}
