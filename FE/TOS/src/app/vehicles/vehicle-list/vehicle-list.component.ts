import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Vehicle } from '../../core/vehicle.model';
import { VehicleDetailsComponent } from '../vehicle-details/vehicle-details.component';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { MyGlobalServiceService } from '../../my-global-service.service';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,VehicleDetailsComponent,AddVehicleComponent ],
  templateUrl: 'vehicle-list.component.html',
  styleUrls: ['vehicle-list.component.scss']
})

export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[]  ;


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

  constructor(private globalService: MyGlobalServiceService) {
    this.vehicles = globalService.vehicles;
  }

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
