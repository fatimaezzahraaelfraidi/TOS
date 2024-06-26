import { Component, OnInit } from '@angular/core';
import { Driver } from '../../core/driver.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { DriverDetailsComponent } from '../driver-details/driver-details.component';
import { MyGlobalServiceService } from '../../my-global-service.service';
@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,AddDriverComponent,DriverDetailsComponent],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.scss'
})
export class DriverListComponent implements OnInit {
  drivers: Driver[] ;
  filteredDrivers: Driver[] = [];
  selectedDrivers: Driver[] = [];
  searchText = '';
  currentPage = 1;
  itemsPerPage = 15;
  pages: number[] = [];
  selectAllCheckbox: boolean = false;
  selectedDriverIds: string[] = [];
  selectedDriver: Driver | null = null;
  newDriverId: string | null = null; 
  
  showAddDriverPopup: boolean = false;

  constructor(private globalService: MyGlobalServiceService) {
    this.drivers = globalService.drivers;
  }
  ngOnInit() {
    this.filteredDrivers = [...this.drivers];
    this.updatePagination();
  }

  filterDrivers() {
    this.filteredDrivers = this.drivers.filter(driver =>
      driver.first_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      driver.last_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      driver.driver_license_number.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.updatePagination();
  }

  selectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.selectAllCheckbox = checkbox.checked;
    if (this.selectAllCheckbox) {
      this.selectedDriverIds = this.filteredDrivers.map(driver => driver.driver_id);
      this.selectedDrivers = [...this.filteredDrivers];
    } else {
      this.selectedDriverIds = [];
      this.selectedDrivers = [];
    }
  }

  toggleSelection(driver: Driver) {
    const index = this.selectedDriverIds.indexOf(driver.driver_id);
    if (index === -1) {
      this.selectedDriverIds.push(driver.driver_id);
      this.selectedDrivers.push(driver);
    } else {
      this.selectedDriverIds.splice(index, 1);
      this.selectedDrivers = this.selectedDrivers.filter(v => v.driver_id !== driver.driver_id);
    }
  }

  deleteSelected() {
    this.drivers = this.drivers.filter(driver => !this.selectedDrivers.includes(driver));
    this.selectedDrivers = [];
    this.filterDrivers();
  }

  openDriverDetails(driver: Driver) {
    this.selectedDriver = driver;
  }

  closeDriverDetails() {
    this.selectedDriver = null;
  }

  addNewDriver(newDriver: Driver) {
    this.drivers.push(newDriver);
    this.newDriverId = newDriver.driver_id;
    this.filterDrivers();
    this.highlightNewDriver();
  }

  updatePagination() {
    this.pages = [];
    for (let i = 1; i <= Math.ceil(this.filteredDrivers.length / this.itemsPerPage); i++) {
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

  highlightNewDriver() {
    const index = this.filteredDrivers.findIndex(driver => driver.driver_id === this.newDriverId);
    if (index !== -1) {
      this.currentPage = Math.ceil((index + 1) / this.itemsPerPage);
      this.updatePagination();
      setTimeout(() => {
        this.newDriverId = null; // Reset the new driver ID after highlighting
      }, 2000); // Highlight duration
    }
  }


  openAddDriverPopup() {
    this.showAddDriverPopup = true;
  }

  closeAddDriverPopup() {
    this.showAddDriverPopup = false;
  }

}
