import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GoogleMapsLoaderService } from '../../core/googlemapLoader.service';
import { DeliveryOrder } from '../../core/delivery-order.model';
import { format, parse } from 'date-fns';
import {GoogleMap, MapDirectionsRenderer, MapDirectionsService} from '@angular/google-maps';
import { Driver } from '../../core/driver.model';
import { MyGlobalServiceService } from '../../my-global-service.service';
import { BehaviorSubject } from 'rxjs'
declare var google: any;

@Component({
  selector: 'app-tour-map',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './tour-map.component.html',
  styleUrl: './tour-map.component.scss'
})
export class TourMapComponent implements OnInit{
  delivery_orders: DeliveryOrder[] = [
      {delivery_order_id: "DO-01", created_at: "2024-06-09T08:00:00", status: "In Transit", owner: "John Doe", delivery_address: "789 Hassan II Avenue, Casablanca, Morocco", delivery_address_latitude: "33.581477", delivery_address_longitude: "-7.633272", delivery_man: "dr_1", planned_delivery_date: "2024-06-10", reel_delivery_date: "", planned_delivery_time: "10:00 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-02", created_at: "2024-06-09T09:30:00", status: "In Transit", owner: "Jane Smith", delivery_address: "456 Mohammed V Street, Rabat, Morocco", delivery_address_latitude: "33.583479", delivery_address_longitude: "-7.636192", delivery_man: "dr_1", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "10:12 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-03", created_at: "2024-06-09T10:45:00", status: "In Transit", owner: "Mark Johnson", delivery_address: "101 Hassan II Boulevard, Marrakech, Morocco", delivery_address_latitude: "33.582263", delivery_address_longitude: "-7.637910", delivery_man: "dr_1", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "10:15 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-04", created_at: "2024-06-09T12:15:00", status: "In Transit", owner: "Emily Brown", delivery_address: "222 Mohammed VI Avenue, Tangier, Morocco", delivery_address_latitude: "33.583595", delivery_address_longitude: "-7.639377", delivery_man: "dr_1", planned_delivery_date: "2024-06-11", reel_delivery_date: "", planned_delivery_time: "10:18 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-05", created_at: "2024-06-09T13:30:00", status: "In Transit", owner: "Emma White", delivery_address: "555 Abdelkrim Khattabi Street, Fez, Morocco", delivery_address_latitude: "33.586598", delivery_address_longitude: "-7.639206", delivery_man: "dr_1", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "10:25 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-06", created_at: "2024-06-09T14:45:00", status: "In Transit", owner: "James Wilson", delivery_address: "777 King Hassan II Street, Agadir, Morocco", delivery_address_latitude: "33.589386", delivery_address_longitude: "-7.635858", delivery_man: "dr_1", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "10:35 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-07", created_at: "2024-06-09T16:00:00", status: "In Transit", owner: "Olivia Taylor", delivery_address: "888 Mohammed V Avenue, Casablanca, Morocco", delivery_address_latitude: "33.589243", delivery_address_longitude: "-7.632425", delivery_man: "dr_1", planned_delivery_date: "2024-06-12", reel_delivery_date: "", planned_delivery_time: "10:40 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-08", created_at: "2024-06-09T17:15:00", status: "In Transit", owner: "Noah Anderson", delivery_address: "333 Youssef Ibn Tachfine Street, Rabat, Morocco", delivery_address_latitude: "33.592461", delivery_address_longitude: "-7.629678", delivery_man: "dr_1", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "10:55 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-09", created_at: "2024-06-09T18:30:00", status: "In Transit", owner: "Isabella Martinez", delivery_address: "555 Avenue Prince Moulay Rachid, Marrakech, Morocco", delivery_address_latitude: "33.597751", delivery_address_longitude: "-7.635772", delivery_man: "dr_1", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "11:03 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-10", created_at: "2024-06-09T19:45:00", status: "In Transit", owner: "William Lopez", delivery_address: "444 Avenue Mohammed VI, Tangier, Morocco", delivery_address_latitude: "33.598466", delivery_address_longitude: "-7.632408", delivery_man: "dr_1", planned_delivery_date: "2024-06-13", reel_delivery_date: "", planned_delivery_time: "11:10 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-11", created_at: "2024-06-09T21:00:00", status: "In Transit", owner: "Sophia Garcia", delivery_address: "777 Hassan II Boulevard, Agadir, Morocco", delivery_address_latitude: "33.600325", delivery_address_longitude: "-7.630262", delivery_man: "dr_1", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "11:17 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-12", created_at: "2024-06-09T22:15:00", status: "In Transit", owner: "Liam Perez", delivery_address: "123 Youssef Ibn Tachfine Avenue, Rabat, Morocco", delivery_address_latitude: "33.583808", delivery_address_longitude: "-7.615199", delivery_man: "dr_2", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "10:30 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-13", created_at: "2024-06-09T23:30:00", status: "In Transit", owner: "Mia Flores", delivery_address: "888 Avenue Hassan II, Marrakech, Morocco", delivery_address_latitude: "33.583808", delivery_address_longitude: "-7.612238", delivery_man: "dr_2", planned_delivery_date: "2024-06-14", reel_delivery_date: "", planned_delivery_time: "10:37 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-14", created_at: "2024-06-10T00:45:00", status: "In Transit", owner: "Ava Gonzales", delivery_address: "666 Mohammed V Street, Casablanca, Morocco", delivery_address_latitude: "33.584988", delivery_address_longitude: "-7.610693", delivery_man: "dr_2", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "10:43 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-15", created_at: "2024-06-10T02:00:00", status: "In Transit", owner: "Lucas Torres", delivery_address: "555 Avenue Hassan II, Tangier, Morocco", delivery_address_latitude: "33.585917", delivery_address_longitude: "-7.608976", delivery_man: "dr_2", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "10:57 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-16", created_at: "2024-06-10T03:15:00", status: "In Transit", owner: "Harper Martinez", delivery_address: "777 Mohammed VI Avenue, Rabat, Morocco", delivery_address_latitude: "33.586775", delivery_address_longitude: "-7.610221", delivery_man: "dr_2", planned_delivery_date: "2024-06-15", reel_delivery_date: "", planned_delivery_time: "11:08 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-17", created_at: "2024-06-10T04:30:00", status: "In Transit", owner: "Ethan Watson", delivery_address: "123 Hassan II Boulevard, Marrakech, Morocco", delivery_address_latitude: "33.588098", delivery_address_longitude: "-7.611551", delivery_man: "dr_2", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "11:16 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-18", created_at: "2024-06-10T05:45:00", status: "In Transit", owner: "Charlotte Green", delivery_address: "456 Mohammed V Avenue, Agadir, Morocco", delivery_address_latitude: "33.589337", delivery_address_longitude: "-7.613555", delivery_man: "dr_2", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "11:28 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-19", created_at: "2024-06-10T07:00:00", status: "In Transit", owner: "Jack Young", delivery_address: "789 Abdelkrim Khattabi Street, Fez, Morocco", delivery_address_latitude: "33.590490", delivery_address_longitude: "-7.614706", delivery_man: "dr_2", planned_delivery_date: "2024-06-16", reel_delivery_date: "", planned_delivery_time: "11:37 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-20", created_at: "2024-06-10T08:15:00", status: "In Transit", owner: "Evelyn Harris", delivery_address: "222 Prince Moulay Rachid Street, Casablanca, Morocco", delivery_address_latitude: "33.591632", delivery_address_longitude: "-7.615849", delivery_man: "dr_2", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "11:45 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-21", created_at: "2024-06-10T09:30:00", status: "In Transit", owner: "Aiden Clark", delivery_address: "333 Avenue Youssef Ibn Tachfine, Rabat, Morocco", delivery_address_latitude: "33.559022", delivery_address_longitude: "-7.679851", delivery_man: "dr_3", planned_delivery_date: "2024-06-17", reel_delivery_date: "", planned_delivery_time: "09:00 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-22", created_at: "2024-06-10T10:45:00", status: "In Transit", owner: "Ella Rodriguez", delivery_address: "101 Avenue Hassan II, Casablanca, Morocco", delivery_address_latitude: "33.562885", delivery_address_longitude: "-7.680537", delivery_man: "dr_3", planned_delivery_date: "2024-06-18", reel_delivery_date: "", planned_delivery_time: "09:12 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-23", created_at: "2024-06-10T12:00:00", status: "In Transit", owner: "Avery Sanchez", delivery_address: "456 Avenue Prince Moulay Rachid, Marrakech, Morocco", delivery_address_latitude: "33.566604", delivery_address_longitude: "-7.682082", delivery_man: "dr_3", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "09:20 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-24", created_at: "2024-06-10T13:15:00", status: "In Transit", owner: "Scarlett King", delivery_address: "789 Avenue Mohammed VI, Agadir, Morocco", delivery_address_latitude: "33.571038", delivery_address_longitude: "-7.685256", delivery_man: "dr_3", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "09:28 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-25", created_at: "2024-06-10T14:30:00", status: "In Transit", owner: "Henry Baker", delivery_address: "222 Avenue Abdelkrim Khattabi, Fez, Morocco", delivery_address_latitude: "33.570823", delivery_address_longitude: "-7.680881", delivery_man: "dr_3", planned_delivery_date: "2024-06-19", reel_delivery_date: "", planned_delivery_time: "09:38 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-26", created_at: "2024-06-10T15:45:00", status: "In Transit", owner: "Grace Mitchell", delivery_address: "555 Avenue Hassan II, Tangier, Morocco", delivery_address_latitude: "33.569178", delivery_address_longitude: "-7.674361", delivery_man: "dr_3", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "09:46 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-27", created_at: "2024-06-10T17:00:00", status: "In Transit", owner: "Samuel Brooks", delivery_address: "777 Avenue Mohammed V, Casablanca, Morocco", delivery_address_latitude: "33.563743", delivery_address_longitude: "-7.670243", delivery_man: "dr_3", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "09:58 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-28", created_at: "2024-06-10T18:15:00", status: "In Transit", owner: "Emily Nelson", delivery_address: "101 Avenue Youssef Ibn Tachfine, Rabat, Morocco", delivery_address_latitude: "33.559237", delivery_address_longitude: "-7.668957", delivery_man: "dr_3", planned_delivery_date: "2024-06-20", reel_delivery_date: "", planned_delivery_time: "10:05 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-29", created_at: "2024-06-10T19:30:00", status: "In Transit", owner: "Logan Hall", delivery_address: "888 Avenue Prince Moulay Rachid, Marrakech, Morocco", delivery_address_latitude: "33.555446", delivery_address_longitude: "-7.670758", delivery_man: "dr_3", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "10:16 AM", reel_delivery_time: ""},
      {delivery_order_id: "DO-30", created_at: "2024-06-10T20:45:00", status: "In Transit", owner: "Madison Lewis", delivery_address: "666 Avenue Hassan II, Agadir, Morocco", delivery_address_latitude: "33.552227", delivery_address_longitude: "-7.674962", delivery_man: "dr_3", planned_delivery_date: "2024-06-21", reel_delivery_date: "", planned_delivery_time: "10:29 AM", reel_delivery_time: ""}
  ];
  drivers: Driver[] = [];
  percentage: number = 30;
  
  filtered_delivery_orders: DeliveryOrder[] = [];
  ordersByDriver: { [key: string]: DeliveryOrder[] } = {};
  depotCoordinates = { lat: 33.570109, lng: -7.628712 };
  private deliveryOrdersSubject = new BehaviorSubject<DeliveryOrder[]>([]);

delivery_orders$ = this.deliveryOrdersSubject.asObservable();

  @ViewChild('map') map!:  google.maps.Map;
  directionsService: google.maps.DirectionsService | undefined;
  directionsRenderers: { [key: string]: google.maps.DirectionsRenderer } = {};
  vehicleMarkers: { [key: string]: google.maps.Marker } = {};

  constructor(
    private googleMapsLoaderService: GoogleMapsLoaderService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private myGlobalService: MyGlobalServiceService
  ) { }

  ngOnInit() {
    this.filtered_delivery_orders = this.delivery_orders.filter(order => order.status === 'In Transit');
    
    this.googleMapsLoaderService.loadGoogleMapsAPI()
      .then(() => {
        this.directionsService = new google.maps.DirectionsService();
        this.loadMap();
      })
      .catch(error => {
        console.error(error);
      });
    this.getDriverOrders();
  }

  getMarkerColor(driver: string): string {
    switch (driver.toLowerCase()) {
      case "dr_1":
        return "#D90A0A";
      case "dr_2":
        return "#1968DE";
      case "dr_3":
        return "#167B2C";
      default:
        return "#fff";
    }
  }

  loadMap() {
    const mapOptions = {
      center: { lat: 33.588717, lng: -7.626495 },
      zoom: 15,
      styles: this.getCustomMapStyles(),
      disableDefaultUI: true,
      fullscreenControl: true
    };
    this.map = new google.maps.Map(document.getElementById('map')!, mapOptions);
    this.groupAndDrawRoutes();
  }

  groupAndDrawRoutes() {
    const ordersByDriver: { [key: string]: DeliveryOrder[] } = {};

    this.delivery_orders.forEach(order => {
      if (!ordersByDriver[order.delivery_man]) {
        ordersByDriver[order.delivery_man] = [];
      }
      ordersByDriver[order.delivery_man].push(order);
    });

    for (const driver in ordersByDriver) {
      if (ordersByDriver.hasOwnProperty(driver)) {
        const sortedOrders = ordersByDriver[driver].sort((a, b) =>
          new Date(a.planned_delivery_time).getTime() - new Date(b.planned_delivery_time).getTime());

        // Create a new directions renderer for each driver
        this.directionsRenderers[driver] = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: this.getMarkerColor(driver)
          }
        });
        this.directionsRenderers[driver].setMap(this.map);
        this.drawRoute(sortedOrders, driver);
      }
    }
  }

  drawRoute(orders: DeliveryOrder[], driver: string) {
    if (orders.length < 2) return;

    const waypoints = orders.map(order => ({
      location: { lat: parseFloat(order.delivery_address_latitude), lng: parseFloat(order.delivery_address_longitude) },
      stopover: true
    }));

    const origin = { lat: this.depotCoordinates.lat, lng: this.depotCoordinates.lng };
    const destination = { lat: this.depotCoordinates.lat, lng: this.depotCoordinates.lng  };

    const request = {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true 
    };

    this.directionsService?.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderers[driver].setDirections(result);
        this.addMarkers(orders);
        this.simulateVehicleMovement(result, driver);
      } else {
        console.error('Error fetching directions', result);
      }
    });
  }

  addMarkers(orders: DeliveryOrder[]) {
    orders.forEach(order => {
      new google.maps.Marker({
        position: { lat: parseFloat(order.delivery_address_latitude), lng: parseFloat(order.delivery_address_longitude) },
        map: this.map,
        title: `Order ID: ${order.delivery_order_id}`,
        icon: this.getCustomMarkerIcon(order.delivery_man, order.status)
      });
    });
  }

  getCustomMarkerIcon(driver: string, status: string) {
    const svgIcon = `
      <svg width="30" height="40" viewBox="0 0 24 30" fill="${this.getMarkerColor(driver)}" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 10C8.13 10 5 13.13 5 17C5 20.74 9.19 24.51 11.47 28.32C11.74 28.78 12.26 28.78 12.53 28.32C14.81 24.51 19 20.74 19 17C19 13.13 15.87 10 12 10ZM12 19.5C10.62 19.5 9.5 18.38 9.5 17C9.5 15.62 10.62 14.5 12 14.5C13.38 14.5 14.5 15.62 14.5 17C14.5 18.38 13.38 19.5 12 19.5Z"/>
      </svg>
    `;
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgIcon)}`,
      scaledSize: new google.maps.Size(50, 60)
    };
  }

  getCustomMapStyles() {
    return [
      {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [{
          "color": "#878787"
        }]
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
      },
      {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ];
  }

  modifyOrder(order: DeliveryOrder) {
    
  }


getDriverOrders() {
  this.delivery_orders.forEach(order => {
    if (!this.ordersByDriver[order.delivery_man]) {
      this.ordersByDriver[order.delivery_man] = [];
    }
    this.ordersByDriver[order.delivery_man].push(order);
  });
}


getDriverInfo(driverId: string): Driver | undefined {
  return this.myGlobalService.drivers.find(driver => driver.driver_id === driverId);
}

getDriverKeys(): string[] {
  return Object.keys(this.ordersByDriver);
}

isTourWillStarted(driverId: string): boolean {
  return this.ordersByDriver[driverId].every(order => order.status === 'In Preparation');
}

isTourFinished(driverId: string): boolean {
  return this.ordersByDriver[driverId].every(order => order.status === 'Shipped');
}
getTourStatus(driverId: string): string {
  if (this.isTourWillStarted(driverId)) {
    return 'Not Started Yet';
  } else if (this.isTourFinished(driverId)) {
    return 'Finished';
  } else {
    return 'In Progress';
  }
}

getTourProgress(driverId: string): number {
  const totalOrders = this.ordersByDriver[driverId].length;
  const completedOrders = this.ordersByDriver[driverId].filter(order => order.status === 'Shipped').length;
  return parseFloat(((completedOrders / totalOrders) * 100).toFixed(1));
}

getStartAndEndTimes(orders: DeliveryOrder[]): { start: Date, end: Date } {
  if (orders.length === 0) {
    return { start: new Date(), end: new Date() };
  }

  const sortedOrders = orders.sort((a, b) =>
    new Date(a.planned_delivery_time).getTime() - new Date(b.planned_delivery_time).getTime()
  );

  return {
    start: new Date(sortedOrders[0].planned_delivery_time),
    end: new Date(sortedOrders[sortedOrders.length - 1].planned_delivery_time)
  };
}


getStartTime(driverId: string): string | undefined {
  const driverOrders = this.ordersByDriver[driverId];
  if (!driverOrders || driverOrders.length === 0) {
    return undefined;
  }
  let parsedTime = parse(driverOrders[0].planned_delivery_time, 'h:mm aa', new Date());
  const startTime = new Date(parsedTime.getTime() - 15 * 60000); // 15 minutes in milliseconds
  return startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

getEndTime(driverId: string): string | undefined {
  const driverOrders = this.ordersByDriver[driverId];
  if (!driverOrders || driverOrders.length === 0) {
    return undefined;
  }
  
  let parsedTime = parse(driverOrders[driverOrders.length - 1].planned_delivery_time, 'h:mm aa', new Date());
  // const lastOrderTime = new Date(driverOrders[driverOrders.length - 1].planned_delivery_time);
  
  const endTime = new Date(parsedTime.getTime() + 15 * 60000); // 15 minutes in milliseconds

  return endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

getVehicleIcon(driver: string) {
  const svgIcon = `
  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="${this.getMarkerColor(driver)}" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z" clip-rule="evenodd"/>
</svg>
`;
return {
  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgIcon)}`,
  scaledSize: new google.maps.Size(30, 30)
};



}

simulateVehicleMovement(directionsResult: google.maps.DirectionsResult, driver: string) {
  const route = directionsResult.routes[0];
  const steps = route.legs.flatMap(leg => leg.steps);
  const vehicleMarker = new google.maps.Marker({
    position: steps[0].start_location,
    map: this.map,
    icon: this.getVehicleIcon(driver)
  });
  this.vehicleMarkers[driver] = vehicleMarker;

  let stepIndex = 0;
  const stepDuration = 1000; // milliseconds
  const deliveryPointDuration = 5000; // 5 seconds

  const moveVehicle = () => {
    const currentStep = steps[stepIndex];
    const nextStep = steps[stepIndex + 1];

    if (!nextStep) {
      console.log("Route completed for driver "+driver+". Final order statuses:");
      this.ordersByDriver[driver].forEach(order => {
        order.status = "Shipped"
      })
      this.ordersByDriver[driver].forEach(order => {
        console.log(order.delivery_order_id, order.status);
        if (order.status !== 'Shipped') {
          console.warn(`Order ${order.delivery_order_id} not marked as 'Shipped'`);
          this.getTourProgress(order.delivery_man);
        }
      });
      vehicleMarker.setMap(null);
      return;
    }

    const latDiff = (nextStep.start_location.lat() - currentStep.start_location.lat()) / stepDuration;
    const lngDiff = (nextStep.start_location.lng() - currentStep.start_location.lng()) / stepDuration;

    let stepStartTime = Date.now();

    const animateStep = () => {
      const now = Date.now();
      const progress = (now - stepStartTime) / stepDuration;

      if (progress >= 1) {
        vehicleMarker.setPosition(nextStep.start_location);
        stepIndex++;

        // Check if the next step is a delivery point
        if (this.isDeliveryPoint(nextStep.start_location, driver)) {
          this.updateOrderStatus(nextStep.start_location, driver);
          setTimeout(() => {
            moveVehicle();
          }, deliveryPointDuration); // Wait for 5 seconds before moving to the next step
        } else {
          moveVehicle();
        }
      } else {
        const lat = currentStep.start_location.lat() + latDiff * (now - stepStartTime);
        const lng = currentStep.start_location.lng() + lngDiff * (now - stepStartTime);
        vehicleMarker.setPosition({ lat, lng });
        requestAnimationFrame(animateStep);
      }
    };

    requestAnimationFrame(animateStep);
  };

  moveVehicle();
}

isDeliveryPoint(location: google.maps.LatLng, driver: string): boolean {
  const precision = 1e-2;
  const deliveryPoints = this.ordersByDriver[driver].map(order => ({
    lat: parseFloat(order.delivery_address_latitude),
    lng: parseFloat(order.delivery_address_longitude)
  }));


  return deliveryPoints.some(point =>
    Math.abs(point.lat - location.lat()) < precision &&
    Math.abs(point.lng - location.lng()) < precision
  );
}

updateOrderStatus(location: google.maps.LatLng, driver: string) {
  const precision = 1e-2;
  const order = this.ordersByDriver[driver].find(order =>
    Math.abs(parseFloat(order.delivery_address_latitude) - location.lat()) < precision &&
    Math.abs(parseFloat(order.delivery_address_longitude) - location.lng()) < precision
  );

  if (order) {
    console.log(order.delivery_order_id)
    order.status = 'Shipped';
    this.getTourProgress(order.delivery_man);
    // console.log("Order status updated to 'Shipped' for:", order);
  } else {
    console.warn("No matching order found for location:", location.toString());
  }
}
}
