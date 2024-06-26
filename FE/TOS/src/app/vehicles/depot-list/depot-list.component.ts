import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Depot } from '../../core/depot.model';
import { DepotDetailsComponent } from '../depot-details/depot-details.component';
import { AddDepotComponent } from '../add-depot/add-depot.component';
import { AgmMap } from '@agm/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowCoordinatesComponent } from '../../maps/show-coordinates/show-coordinates.component';

@Component({
  selector: 'app-depot-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,DepotDetailsComponent,AddDepotComponent ],
  templateUrl: 'depot-list.component.html',
  styleUrls: ['depot-list.component.scss']
})

export class DepotListComponent implements OnInit {
  @ViewChild('map') map: AgmMap | undefined;
  
  depots: Depot[] = [
    { depot_id: '1', name: 'Depot 1', phone_number: '1112223333', full_address: '1234 Elm Street, City, Country', latitude: '33.787368', longitude: '-7.157286' },
    { depot_id: '2', name: 'Depot 2', phone_number: '2223334444', full_address: '5678 Oak Avenue, City, Country', latitude: '23.456', longitude: '234.567' },
    { depot_id: '3', name: 'Depot 3', phone_number: '3334445555', full_address: '9012 Maple Drive, City, Country', latitude: '34.567', longitude: '345.678' },
    { depot_id: '4', name: 'Depot 4', phone_number: '4445556666', full_address: '3456 Pine Road, City, Country', latitude: '45.678', longitude: '456.789' },
    { depot_id: '5', name: 'Depot 5', phone_number: '5556667777', full_address: '7890 Cedar Lane, City, Country', latitude: '56.789', longitude: '567.890' },
    { depot_id: '6', name: 'Depot 6', phone_number: '6667778888', full_address: '1234 Elm Street, City, Country', latitude: '67.890', longitude: '678.901' },
    { depot_id: '7', name: 'Depot 7', phone_number: '7778889999', full_address: '5678 Oak Avenue, City, Country', latitude: '78.901', longitude: '789.012' },
    { depot_id: '8', name: 'Depot 8', phone_number: '8889990000', full_address: '9012 Maple Drive, City, Country', latitude: '89.012', longitude: '890.123' },
    { depot_id: '9', name: 'Depot 9', phone_number: '9990001111', full_address: '3456 Pine Road, City, Country', latitude: '90.123', longitude: '901.234' },
    { depot_id: '10', name: 'Depot 10', phone_number: '1011121314', full_address: '7890 Cedar Lane, City, Country', latitude: '01.234', longitude: '012.345' },
    { depot_id: '11', name: 'Depot 11', phone_number: '1112131415', full_address: '1234 Elm Street, City, Country', latitude: '11.345', longitude: '123.456' },
    { depot_id: '12', name: 'Depot 12', phone_number: '1213141516', full_address: '5678 Oak Avenue, City, Country', latitude: '12.456', longitude: '234.567' },
    { depot_id: '13', name: 'Depot 13', phone_number: '1314151617', full_address: '9012 Maple Drive, City, Country', latitude: '13.567', longitude: '345.678' },
    { depot_id: '14', name: 'Depot 14', phone_number: '1415161718', full_address: '3456 Pine Road, City, Country', latitude: '14.678', longitude: '456.789' },
    { depot_id: '15', name: 'Depot 15', phone_number: '1516171819', full_address: '7890 Cedar Lane, City, Country', latitude: '15.789', longitude: '567.890' },
    { depot_id: '16', name: 'Depot 16', phone_number: '1617181920', full_address: '1234 Elm Street, City, Country', latitude: '16.890', longitude: '678.901' },
    { depot_id: '17', name: 'Depot 17', phone_number: '1718192021', full_address: '5678 Oak Avenue, City, Country', latitude: '17.901', longitude: '789.012' },
    { depot_id: '18', name: 'Depot 18', phone_number: '1819202122', full_address: '9012 Maple Drive, City, Country', latitude: '18.012', longitude: '890.123' },
    { depot_id: '19', name: 'Depot 19', phone_number: '1920212223', full_address: '3456 Pine Road, City, Country', latitude: '19.123', longitude: '901.234' },
    { depot_id: '20', name: 'Depot 20', phone_number: '2021222324', full_address: '7890 Cedar Lane, City, Country', latitude: '20.234', longitude: '012.345' },
    { depot_id: '21', name: 'Depot 21', phone_number: '2122232425', full_address: '1234 Elm Street, City, Country', latitude: '21.345', longitude: '123.456' },
    { depot_id: '22', name: 'Depot 22', phone_number: '2223242526', full_address: '5678 Oak Avenue, City, Country', latitude: '22.456', longitude: '234.567' },
    { depot_id: '23', name: 'Depot 23', phone_number: '2324252627', full_address: '9012 Maple Drive, City, Country', latitude: '23.567', longitude: '345.678' },
    { depot_id: '24', name: 'Depot 24', phone_number: '2425262728', full_address: '3456 Pine Road, City, Country', latitude: '24.678', longitude: '456.789' },
    { depot_id: '25', name: 'Depot 25', phone_number: '2526272829', full_address: '7890 Cedar Lane, City, Country', latitude: '25.789', longitude: '567.890' },
    { depot_id: '26', name: 'Depot 26', phone_number: '2627282930', full_address: '1234 Elm Street, City, Country', latitude: '26.890', longitude: '678.901' },
    { depot_id: '27', name: 'Depot 27', phone_number: '2728293031', full_address: '5678 Oak Avenue, City, Country', latitude: '27.901', longitude: '789.012' },
    { depot_id: '28', name: 'Depot 28', phone_number: '2829303132', full_address: '9012 Maple Drive, City, Country', latitude: '28.012', longitude: '890.123' },
    { depot_id: '29', name: 'Depot 29', phone_number: '2930313233', full_address: '3456 Pine Road, City', latitude: '28.012', longitude: '890.123' },
    ];


  filteredDepots: Depot[] = [];
  selectedDepots: Depot[] = [];
  searchText = '';
  currentPage = 1;
  itemsPerPage = 15;
  pages: number[] = [];
  selectAllCheckbox: boolean = false;
  selectedDepotIds: string[] = [];
  selectedDepot: Depot | null = null;
  newDepotId: string | null = null; // To store the ID of the newly added depot
  
  showAddDepotPopup: boolean = false;


  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.filteredDepots = [...this.depots];
    this.updatePagination();
  }

  filterDepots() {
    this.filteredDepots = this.depots.filter(depot =>
      depot.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      depot.full_address.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.updatePagination();
  }

  selectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.selectAllCheckbox = checkbox.checked;
    if (this.selectAllCheckbox) {
      this.selectedDepotIds = this.filteredDepots.map(depot => depot.depot_id);
      this.selectedDepots = [...this.filteredDepots];
    } else {
      this.selectedDepotIds = [];
      this.selectedDepots = [];
    }
  }

  toggleSelection(depot: Depot) {
    const index = this.selectedDepotIds.indexOf(depot.depot_id);
    if (index === -1) {
      this.selectedDepotIds.push(depot.depot_id);
      this.selectedDepots.push(depot);
    } else {
      this.selectedDepotIds.splice(index, 1);
      this.selectedDepots = this.selectedDepots.filter(v => v.depot_id !== depot.depot_id);
    }
  }

  deleteSelected() {
    this.depots = this.depots.filter(depot => !this.selectedDepots.includes(depot));
    this.selectedDepots = [];
    this.filterDepots();
  }

  openDepotDetails(depot: Depot) {
    this.selectedDepot = depot;
  }

  closeDepotDetails() {
    this.selectedDepot = null;
  }

  addNewDepot(newDepot: Depot) {
    this.depots.push(newDepot);
    this.newDepotId = newDepot.depot_id;
    this.filterDepots();
    this.highlightNewDepot();
  }

  updatePagination() {
    this.pages = [];
    for (let i = 1; i <= Math.ceil(this.filteredDepots.length / this.itemsPerPage); i++) {
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

  highlightNewDepot() {
    const index = this.filteredDepots.findIndex(depot => depot.depot_id === this.newDepotId);
    if (index !== -1) {
      this.currentPage = Math.ceil((index + 1) / this.itemsPerPage);
      this.updatePagination();
      setTimeout(() => {
        this.newDepotId = null; // Reset the new depot ID after highlighting
      }, 2000); // Highlight duration
    }
  }


openAddDepotPopup() {
  this.showAddDepotPopup = true;
}

closeAddDepotPopup() {
  this.showAddDepotPopup = false;
}

showMapPopup(depot: Depot) {
  this.loadGoogleMapsScript(() => {
    const dialogRef = this.dialog.open(ShowCoordinatesComponent, {
      width: '600px',
      data: {
        latitude: depot.latitude,
        longitude: depot.longitude,
        title: depot.name+" Location"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  });
}

loadGoogleMapsScript(callback: () => void) {
  const existingScript = document.getElementById('googleMaps');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCDIGTD49GEgMvz4Czl_2g3IWoDENl2ARc&libraries=places';
    script.id = 'googleMaps';
    document.body.appendChild(script);
    script.onload = () => {
      callback();
    };
  } else {
    callback();
  }
}

}