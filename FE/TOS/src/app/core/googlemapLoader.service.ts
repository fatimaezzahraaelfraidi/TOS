// Import Injectable from @angular/core
import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsLoaderService {

  loadGoogleMapsAPI(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCDIGTD49GEgMvz4Czl_2g3IWoDENl2ARc`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Failed to load Google Maps API'));
      };
      document.body.appendChild(script);
    });
  }
}
