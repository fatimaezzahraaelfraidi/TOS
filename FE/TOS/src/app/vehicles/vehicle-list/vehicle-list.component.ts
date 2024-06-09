import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Vehicle } from '../../core/vehicle.model';
import { VehicleDetailsComponent } from '../vehicle-details/vehicle-details.component';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,VehicleDetailsComponent,AddVehicleComponent ],
  templateUrl: 'vehicle-list.component.html',
  styleUrls: ['vehicle-list.component.scss']
})

export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [
    // Sample data, replace with your actual data
    { registration: 'MA-14567', modelBrand: 'Toyota Camry', fuelType: 'Diesel', capacity: 1, volume: 1000 },
    { registration: 'MA-42567', modelBrand: 'Honda Accord', fuelType: 'Gasoline', capacity: 3, volume: 3000 },
    { registration: 'MA-45367', modelBrand: 'Toyota Camry', fuelType: 'Diesel', capacity: 3, volume: 3000 },
    { registration: 'MA-45647', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 1, volume: 1000 },
    { registration: 'MA-54567', modelBrand: 'Toyota Camry', fuelType: 'Gasoline', capacity: 2, volume: 2000 },
    { registration: 'MA-46567', modelBrand: 'Toyota Camry', fuelType: 'Gasoline', capacity: 1, volume: 1000 },
    { registration: 'MA-45767', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 2, volume: 2000 },
    { registration: 'MA-45687', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 3, volume: 3000 },
    { registration: 'MA-45679', modelBrand: 'Honda Accord', fuelType: 'Gasoline', capacity: 5, volume: 5000 },
    { registration: 'MA-94567', modelBrand: 'Toyota Camry', fuelType: 'Diesel', capacity: 1, volume: 1000 },
    { registration: 'MA-48567', modelBrand: 'Honda Accord', fuelType: 'Gasoline', capacity: 3, volume: 3000 },
    { registration: 'MA-45767', modelBrand: 'Toyota Camry', fuelType: 'Diesel', capacity: 3, volume: 3000 },
    { registration: 'MA-45667', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 1, volume: 1000 },
    { registration: 'MA-45675', modelBrand: 'Toyota Camry', fuelType: 'Gasoline', capacity: 2, volume: 2000 },
    { registration: 'MA-44567', modelBrand: 'Toyota Camry', fuelType: 'Gasoline', capacity: 1, volume: 1000 },
    { registration: 'MA-45567', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 2, volume: 2000 },
    { registration: 'MA-45267', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 3, volume: 3000 },
    { registration: 'MA-45667', modelBrand: 'Honda Accord', fuelType: 'Gasoline', capacity: 5, volume: 5000 },
    { registration: 'MA-45672', modelBrand: 'Toyota Camry', fuelType: 'Diesel', capacity: 1, volume: 1000 },
    { registration: 'MA-45671', modelBrand: 'Honda Accord', fuelType: 'Gasoline', capacity: 3, volume: 3000 },
    { registration: 'MA-45627', modelBrand: 'Toyota Camry', fuelType: 'Diesel', capacity: 3, volume: 3000 },
    { registration: 'MA-45567', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 1, volume: 1000 },
    { registration: 'MA-45367', modelBrand: 'Toyota Camry', fuelType: 'Gasoline', capacity: 2, volume: 2000 },
    { registration: 'MA-451167', modelBrand: 'Toyota Camry', fuelType: 'Gasoline', capacity: 1, volume: 1000 },
    { registration: 'MA-456357', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 2, volume: 2000 },
    { registration: 'MA-4562237', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 3, volume: 3000 },
    { registration: 'MA-456723', modelBrand: 'Honda Accord', fuelType: 'Gasoline', capacity: 5, volume: 5000 }
];


  filteredVehicles: Vehicle[] = [];
  selectedVehicles: Vehicle[] = [];
  searchText = '';
  currentPage = 1;
  itemsPerPage = 15;
  pages: number[] = [];
  selectAllCheckbox: boolean = false;
  selectedVehicleIds: string[] = [];
  selectedVehicle: Vehicle | null = null;
  newVehicleId: string | null = null; // To store the ID of the newly added vehicle
  
  showAddVehiclePopup: boolean = false;

  ngOnInit() {
    this.filteredVehicles = [...this.vehicles];
    this.updatePagination();
  }

  filterVehicles() {
    this.filteredVehicles = this.vehicles.filter(vehicle =>
      vehicle.registration.toLowerCase().includes(this.searchText.toLowerCase()) ||
      vehicle.modelBrand.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.updatePagination();
  }

  selectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.selectAllCheckbox = checkbox.checked;
    if (this.selectAllCheckbox) {
      this.selectedVehicleIds = this.filteredVehicles.map(vehicle => vehicle.registration);
      this.selectedVehicles = [...this.filteredVehicles];
    } else {
      this.selectedVehicleIds = [];
      this.selectedVehicles = [];
    }
  }

  toggleSelection(vehicle: Vehicle) {
    const index = this.selectedVehicleIds.indexOf(vehicle.registration);
    if (index === -1) {
      this.selectedVehicleIds.push(vehicle.registration);
      this.selectedVehicles.push(vehicle);
    } else {
      this.selectedVehicleIds.splice(index, 1);
      this.selectedVehicles = this.selectedVehicles.filter(v => v.registration !== vehicle.registration);
    }
  }

  deleteSelected() {
    this.vehicles = this.vehicles.filter(vehicle => !this.selectedVehicles.includes(vehicle));
    this.selectedVehicles = [];
    this.filterVehicles();
  }

  openVehicleDetails(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
  }

  closeVehicleDetails() {
    this.selectedVehicle = null;
  }

  addNewVehicle(newVehicle: Vehicle) {
    this.vehicles.push(newVehicle);
    this.newVehicleId = newVehicle.registration;
    this.filterVehicles();
    this.highlightNewVehicle();
  }

  updatePagination() {
    this.pages = [];
    for (let i = 1; i <= Math.ceil(this.filteredVehicles.length / this.itemsPerPage); i++) {
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

  highlightNewVehicle() {
    const index = this.filteredVehicles.findIndex(vehicle => vehicle.registration === this.newVehicleId);
    if (index !== -1) {
      this.currentPage = Math.ceil((index + 1) / this.itemsPerPage);
      this.updatePagination();
      setTimeout(() => {
        this.newVehicleId = null; // Reset the new vehicle ID after highlighting
      }, 2000); // Highlight duration
    }
  }


openAddVehiclePopup() {
  this.showAddVehiclePopup = true;
}

closeAddVehiclePopup() {
  this.showAddVehiclePopup = false;
}
}
