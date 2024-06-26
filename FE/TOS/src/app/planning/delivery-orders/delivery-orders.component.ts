import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryOrder } from '../../core/delivery-order.model';
import { DeliveryOrderDetailsComponent } from '../delivery-order-details/delivery-order-details.component';
import { GoogleMapsLoaderService } from '../../core/googlemapLoader.service';

declare var google: any;

@Component({
  selector: 'app-delivery-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,DeliveryOrderDetailsComponent],
  templateUrl: 'delivery-orders.component.html',
  styleUrl: 'delivery-orders.component.scss'
})
export class DeliveryOrdersComponent implements OnInit{

  delivery_orders: DeliveryOrder[] = [
    {delivery_order_id: "DO-001", created_at: "2024-06-09T08:00:00", status: "In Preparation", owner: "John Doe", delivery_address: "789 Hassan II Avenue, Casablanca, Morocco", delivery_address_latitude: "33.5908", delivery_address_longitude: "-7.6100", delivery_man: "Mike Smith", planned_delivery_date: "2024-06-10", reel_delivery_date: "", planned_delivery_time: "10:00 AM", reel_delivery_time: ""},
    {delivery_order_id: "DO-002", created_at: "2024-06-09T09:30:00", status: "In Transit", owner: "Jane Smith", delivery_address: "456 Mohammed V Street, Rabat, Morocco", delivery_address_latitude: "34.0209", delivery_address_longitude: "-6.8416", delivery_man: "Sarah Johnson", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "1:00 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-003", created_at: "2024-06-09T10:45:00", status: "In Transit", owner: "Mark Johnson", delivery_address: "101 Hassan II Boulevard, Marrakech, Morocco", delivery_address_latitude: "31.6295", delivery_address_longitude: "-7.9811", delivery_man: "Chris Williams", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "3:00 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-004", created_at: "2024-06-09T12:15:00", status: "In Preparation", owner: "Emily Brown", delivery_address: "222 Mohammed VI Avenue, Tangier, Morocco", delivery_address_latitude: "35.7721", delivery_address_longitude: "-5.8087", delivery_man: "David Lee", planned_delivery_date: "2024-06-11", reel_delivery_date: "", planned_delivery_time: "11:00 AM", reel_delivery_time: ""},
    {delivery_order_id: "DO-005", created_at: "2024-06-09T13:30:00", status: "Canceled", owner: "Emma White", delivery_address: "555 Abdelkrim Khattabi Street, Fez, Morocco", delivery_address_latitude: "34.0339", delivery_address_longitude: "-5.0003", delivery_man: "Jessica Davis", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "2:30 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-006", created_at: "2024-06-09T14:45:00", status: "Failed Delivery", owner: "James Wilson", delivery_address: "777 King Hassan II Street, Agadir, Morocco", delivery_address_latitude: "30.4278", delivery_address_longitude: "-9.5981", delivery_man: "Kevin Brown", planned_delivery_date: "2024-06-09", reel_delivery_date: "2024-06-09", planned_delivery_time: "5:00 PM", reel_delivery_time: "4:45 PM"},
    {delivery_order_id: "DO-007", created_at: "2024-06-09T16:00:00", status: "Shipped", owner: "Olivia Taylor", delivery_address: "888 Mohammed V Avenue, Casablanca, Morocco", delivery_address_latitude: "33.5883", delivery_address_longitude: "-7.6114", delivery_man: "Andrew Wilson", planned_delivery_date: "2024-06-12", reel_delivery_date: "", planned_delivery_time: "10:00 AM", reel_delivery_time: ""},
    {delivery_order_id: "DO-008", created_at: "2024-06-09T17:15:00", status: "In Transit", owner: "Noah Anderson", delivery_address: "333 Youssef Ibn Tachfine Street, Rabat, Morocco", delivery_address_latitude: "34.0176", delivery_address_longitude: "-6.8328", delivery_man: "Michael Garcia", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "4:00 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-009", created_at: "2024-06-09T18:30:00", status: "In Transit", owner: "Isabella Martinez", delivery_address: "555 Avenue Prince Moulay Rachid, Marrakech, Morocco", delivery_address_latitude: "31.6342", delivery_address_longitude: "-7.9887", delivery_man: "Sophia Hernandez", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "6:00 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-010", created_at: "2024-06-09T19:45:00", status: "Shipped", owner: "William Lopez", delivery_address: "444 Avenue Mohammed VI, Tangier, Morocco", delivery_address_latitude: "35.7781", delivery_address_longitude: "-5.8083", delivery_man: "Daniel Martinez", planned_delivery_date: "2024-06-13", reel_delivery_date: "", planned_delivery_time: "9:00 AM", reel_delivery_time: ""},
    {delivery_order_id: "DO-011", created_at: "2024-06-09T21:00:00", status: "In Transit", owner: "Sophia Garcia", delivery_address: "777 Hassan II Boulevard, Agadir, Morocco", delivery_address_latitude: "30.4220", delivery_address_longitude: "-9.5985", delivery_man: "Emily Adams", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "7:00 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-012", created_at: "2024-06-09T22:15:00", status: "Failed Delivery", owner: "Liam Perez", delivery_address: "123 Youssef Ibn Tachfine Avenue, Rabat, Morocco", delivery_address_latitude: "34.0217", delivery_address_longitude: "-6.8360", delivery_man: "Jacob Ramirez", planned_delivery_date: "2024-06-09", reel_delivery_date: "2024-06-09", planned_delivery_time: "8:30 PM", reel_delivery_time: "8:15 PM"},
    {delivery_order_id: "DO-013", created_at: "2024-06-09T23:30:00", status: "In Preparation", owner: "Mia Flores", delivery_address: "888 Avenue Hassan II, Marrakech, Morocco", delivery_address_latitude: "31.6308", delivery_address_longitude: "-7.9886", delivery_man: "Ethan Torres", planned_delivery_date: "2024-06-14", reel_delivery_date: "", planned_delivery_time: "1:00 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-014", created_at: "2024-06-10T00:45:00", status: "In Transit", owner: "Ava Gonzales", delivery_address: "666 Mohammed V Street, Casablanca, Morocco", delivery_address_latitude: "33.5951", delivery_address_longitude: "-7.6116", delivery_man: "Madison Fisher", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "10:30 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-015", created_at: "2024-06-10T02:00:00", status: "In Preparation", owner: "Lucas Torres", delivery_address: "555 Avenue Hassan II, Tangier, Morocco", delivery_address_latitude: "35.7676", delivery_address_longitude: "-5.8112", delivery_man: "Elijah Collins", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "11:59 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-016", created_at: "2024-06-10T03:15:00", status: "Shipped", owner: "Harper Martinez", delivery_address: "777 Mohammed VI Avenue, Rabat, Morocco", delivery_address_latitude: "34.0233", delivery_address_longitude: "-6.8351", delivery_man: "Scarlett Richardson", planned_delivery_date: "2024-06-15", reel_delivery_date: "", planned_delivery_time: "8:00 AM", reel_delivery_time: ""},
    {delivery_order_id: "DO-017", created_at: "2024-06-10T04:30:00", status: "Canceled", owner: "Ethan Watson", delivery_address: "123 Hassan II Boulevard, Marrakech, Morocco", delivery_address_latitude: "31.6259", delivery_address_longitude: "-7.9921", delivery_man: "Amelia Stewart", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "12:00 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-018", created_at: "2024-06-10T05:45:00", status: "Shipped", owner: "Aiden Green", delivery_address: "444 Mohammed V Avenue, Tangier, Morocco", delivery_address_latitude: "35.7723", delivery_address_longitude: "-5.8091", delivery_man: "Benjamin Hill", planned_delivery_date: "2024-06-09", reel_delivery_date: "2024-06-09", planned_delivery_time: "2:30 PM", reel_delivery_time: "2:15 PM"},
    {delivery_order_id: "DO-019", created_at: "2024-06-10T07:00:00", status: "In Preparation", owner: "Charlotte King", delivery_address: "666 Youssef Ibn Tachfine Avenue, Rabat, Morocco", delivery_address_latitude: "34.0180", delivery_address_longitude: "-6.8346", delivery_man: "Mason Young", planned_delivery_date: "2024-06-16", reel_delivery_date: "", planned_delivery_time: "7:00 AM", reel_delivery_time: ""},
    {delivery_order_id: "DO-020", created_at: "2024-06-10T08:15:00", status: "In Transit", owner: "Amelia Cooper", delivery_address: "888 Hassan II Boulevard, Casablanca, Morocco", delivery_address_latitude: "33.5904", delivery_address_longitude: "-7.6107", delivery_man: "Logan Allen", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "3:00 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-021", created_at: "2024-06-10T09:30:00", status: "Shipped", owner: "Evelyn Morgan", delivery_address: "444 Avenue Mohammed V, Tangier, Morocco", delivery_address_latitude: "35.7761", delivery_address_longitude: "-5.8091", delivery_man: "Lucy Nelson", planned_delivery_date: "2024-06-09", reel_delivery_date: "2024-06-09", planned_delivery_time: "5:00 PM", reel_delivery_time: "4:45 PM"},
    {delivery_order_id: "DO-022", created_at: "2024-06-10T10:45:00", status: "Shipped", owner: "Logan Rivera", delivery_address: "123 Mohammed VI Street, Rabat, Morocco", delivery_address_latitude: "34.0204", delivery_address_longitude: "-6.8426", delivery_man: "Avery Carter", planned_delivery_date: "2024-06-17", reel_delivery_date: "", planned_delivery_time: "11:00 AM", reel_delivery_time: ""},
    {delivery_order_id: "DO-023", created_at: "2024-06-10T12:00:00", status: "In Transit", owner: "Sofia Bailey", delivery_address: "777 Youssef Ibn Tachfine Avenue, Rabat, Morocco", delivery_address_latitude: "34.0195", delivery_address_longitude: "-6.8357", delivery_man: "Ella Mitchell", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "6:00 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-024", created_at: "2024-06-10T13:15:00", status: "Failed Delivery", owner: "Jackson Ross", delivery_address: "555 Mohammed V Street, Casablanca, Morocco", delivery_address_latitude: "33.5958", delivery_address_longitude: "-7.6120", delivery_man: "Kaylee Perez", planned_delivery_date: "2024-06-09", reel_delivery_date: "2024-06-09", planned_delivery_time: "8:30 PM", reel_delivery_time: "8:15 PM"},
    {delivery_order_id: "DO-025", created_at: "2024-06-10T14:30:00", status: "In Preparation", owner: "Mateo Long", delivery_address: "888 Avenue Hassan II, Tangier, Morocco", delivery_address_latitude: "35.7778", delivery_address_longitude: "-5.8105", delivery_man: "Gabriella Evans", planned_delivery_date: "2024-06-18", reel_delivery_date: "", planned_delivery_time: "10:00 AM", reel_delivery_time: ""},
    {delivery_order_id: "DO-026", created_at: "2024-06-10T15:45:00", status: "In Transit", owner: "Scarlett King", delivery_address: "555 Mohammed VI Avenue, Marrakech, Morocco", delivery_address_latitude: "31.6317", delivery_address_longitude: "-7.9873", delivery_man: "Christian Lee", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "11:00 AM", reel_delivery_time: ""},
    {delivery_order_id: "DO-027", created_at: "2024-06-10T17:00:00", status: "Failed Delivery", owner: "Madison Wood", delivery_address: "999 Youssef Ibn Tachfine Street, Rabat, Morocco", delivery_address_latitude: "34.0178", delivery_address_longitude: "-6.8318", delivery_man: "Zoey Nguyen", planned_delivery_date: "2024-06-09", reel_delivery_date: "2024-06-09", planned_delivery_time: "12:30 PM", reel_delivery_time: "12:15 PM"},
    {delivery_order_id: "DO-028", created_at: "2024-06-10T18:15:00", status: "Shipped", owner: "David Price", delivery_address: "444 Mohammed V Avenue, Marrakech, Morocco", delivery_address_latitude: "31.6251", delivery_address_longitude: "-7.9952", delivery_man: "Hailey Rivera", planned_delivery_date: "2024-06-19", reel_delivery_date: "", planned_delivery_time: "1:00 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-029", created_at: "2024-06-10T19:30:00", status: "Canceled", owner: "Victoria Foster", delivery_address: "123 Hassan II Boulevard, Casablanca, Morocco", delivery_address_latitude: "33.5920", delivery_address_longitude: "-7.6133", delivery_man: "Nathan Cooper", planned_delivery_date: "2024-06-09", reel_delivery_date: "", planned_delivery_time: "2:00 PM", reel_delivery_time: ""},
    {delivery_order_id: "DO-030", created_at: "2024-06-10T20:45:00", status: "Shipped", owner: "Riley Hayes", delivery_address: "777 Mohammed VI Avenue, Rabat, Morocco", delivery_address_latitude: "34.0220", delivery_address_longitude: "-6.8355", delivery_man: "Samantha Diaz", planned_delivery_date: "2024-06-09", reel_delivery_date: "2024-06-09", planned_delivery_time: "3:30 PM", reel_delivery_time: "3:15 PM"},
];

  filteredDeliveryOrders: DeliveryOrder[] = [];
  selectedDeliveryOrders: DeliveryOrder[] = [];
  searchText = '';
  currentPage = 1;
  itemsPerPage = 15;
  pages: number[] = [];
  selectAllCheckbox: boolean = false;
  selectedDeliveryOrderIds: string[] = [];
  selectedDeliveryOrder: DeliveryOrder | null = null;
  newDeliveryOrderId: string | null = null; 
  
  map: any;
  showAddDeliveryOrderPopup: boolean = false;
  isMapView: boolean = false; // Initially set to false for list view

  constructor(private googleMapsLoaderService: GoogleMapsLoaderService) {}

  switchView() {
    this.isMapView = !this.isMapView; // Toggle the view
     if (this.isMapView) {
       this.googleMapsLoaderService.loadGoogleMapsAPI()
       .then(() => {
         this.loadMap();
       })
       .catch(error => {
         console.error(error);
       });
     }
  }

  ngOnInit() {
    this.filteredDeliveryOrders = [...this.delivery_orders];
    this.updatePagination();
  }

  filterDeliveryOrders() {
    this.filteredDeliveryOrders = this.delivery_orders.filter(delivery_order =>
      delivery_order.owner.toLowerCase().includes(this.searchText.toLowerCase()) ||
      delivery_order.status.toLowerCase().includes(this.searchText.toLowerCase()) ||
      delivery_order.delivery_order_id.toLowerCase().includes(this.searchText.toLowerCase()) ||
      delivery_order.delivery_man.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.updatePagination();
  }

  selectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.selectAllCheckbox = checkbox.checked;
    if (this.selectAllCheckbox) {
      this.selectedDeliveryOrderIds = this.filteredDeliveryOrders.map(delivery_order => delivery_order.delivery_order_id);
      this.selectedDeliveryOrders = [...this.filteredDeliveryOrders];
    } else {
      this.selectedDeliveryOrderIds = [];
      this.selectedDeliveryOrders = [];
    }
  }

  toggleSelection(delivery_order: DeliveryOrder) {
    const index = this.selectedDeliveryOrderIds.indexOf(delivery_order.delivery_order_id);
    if (index === -1) {
      this.selectedDeliveryOrderIds.push(delivery_order.delivery_order_id);
      this.selectedDeliveryOrders.push(delivery_order);
    } else {
      this.selectedDeliveryOrderIds.splice(index, 1);
      this.selectedDeliveryOrders = this.selectedDeliveryOrders.filter(v => v.delivery_order_id !== delivery_order.delivery_order_id);
    }
  }

  deleteSelected() {
    this.delivery_orders = this.delivery_orders.filter(delivery_order => !this.selectedDeliveryOrders.includes(delivery_order));
    this.selectedDeliveryOrders = [];
    this.filterDeliveryOrders();
  }

  openDeliveryOrderDetails(delivery_order: DeliveryOrder) {
    this.selectedDeliveryOrder = delivery_order;
  }

  closeDeliveryOrderDetails() {
    this.selectedDeliveryOrder = null;
  }

  addNewDeliveryOrder(newDeliveryOrder: DeliveryOrder) {
    this.delivery_orders.push(newDeliveryOrder);
    this.newDeliveryOrderId = newDeliveryOrder.delivery_order_id;
    this.filterDeliveryOrders();
    this.highlightNewDeliveryOrder();
  }

  updatePagination() {
    this.pages = [];
    for (let i = 1; i <= Math.ceil(this.filteredDeliveryOrders.length / this.itemsPerPage); i++) {
      this.pages.push(i);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  highlightNewDeliveryOrder() {
    const index = this.filteredDeliveryOrders.findIndex(delivery_order => delivery_order.delivery_order_id === this.newDeliveryOrderId);
    if (index !== -1) {
      this.currentPage = Math.ceil((index + 1) / this.itemsPerPage);
      this.updatePagination();
      setTimeout(() => {
        this.newDeliveryOrderId = null; // Reset the new delivery_order ID after highlighting
      }, 2000); // Highlight duration
    }
  }


  openAddDeliveryOrderPopup() {
    this.showAddDeliveryOrderPopup = true;
  }

  closeAddDeliveryOrderPopup() {
    this.showAddDeliveryOrderPopup = false;
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
        case "in preparation":
            return "#1252c9"; 
        case "in transit":
            return "#ff6b00";
        case "shipped":
            return "#00be81"; 
        case "failed delivery":
            return "#2f4858"; 
        case "canceled":
            return "#000"; 
        default:
            return "#fff";
    }
  } 

  loadMap() {
    const mapOptions = {
      center: { lat: 33.787368, lng: -7.157286 },
      zoom: 5, // Set the initial zoom level (adjust as needed)
      styles: this.getCustomMapStyles(),
      disableDefaultUI: true,
      fullscreenControl: true 
    };
    this.map = new google.maps.Map(document.getElementById('map')!, mapOptions);
    this.filteredDeliveryOrders.forEach(order => {
      const marker = new google.maps.Marker({
        position: { lat: parseFloat(order.delivery_address_latitude), lng: parseFloat(order.delivery_address_longitude) },
        map: this.map,
        title: `Order ID: ${order.delivery_order_id}`,
        icon: this.getCustomMarkerIcon(order.status)
      });
      marker.addListener('click', () => {
        this.openDeliveryOrderDetails(order);
      });
    });
  
  }

  getCustomMarkerIcon(status: string) {
    const svgIcon = `
      <svg width="50" height="60" viewBox="0 0 24 30" fill="${this.getStatusColor(status)}" xmlns="http://www.w3.org/2000/svg">
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
        "stylers": [ {
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
}
