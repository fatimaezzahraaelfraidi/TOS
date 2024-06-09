import { Component, OnInit } from '@angular/core';
import { Driver } from '../../core/driver.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { DriverDetailsComponent } from '../driver-details/driver-details.component';
@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,AddDriverComponent,DriverDetailsComponent],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.scss'
})
export class DriverListComponent implements OnInit {
  drivers: Driver[] = [
    { driver_id: '1',picture: '', first_name: 'John', last_name: ' Doe', phone_number: '+1234567890', email: 'john@example.com', driver_license_number: 'DL123456' },
    { driver_id: '2',picture: '', first_name: 'Jane ', last_name: ' Smith', phone_number: '+1987654321', email: 'jane@example.com', driver_license_number: 'DL654321' }, 
    { driver_id: '3',picture: '', first_name: 'Mike', last_name: 'Jones', phone_number: '+1122334455', email: 'mike@example.com', driver_license_number: 'DL987654' }, 
    { driver_id: '4',picture: '', first_name: 'Sarah', last_name: 'Adams', phone_number: '+1555666777', email: 'sarah@example.com', driver_license_number: 'DL345678' }, 
    { driver_id: '5',picture: '', first_name: 'John', last_name: ' Doe', phone_number: '+1234567890', email: 'john@example.com', driver_license_number: 'DL123456' },
    { driver_id: '6',picture: '', first_name: 'Jane ', last_name: ' Smith', phone_number: '+1987654321', email: 'jane@example.com', driver_license_number: 'DL654321' },
    { driver_id: '7',picture: '', first_name: 'Mike', last_name: 'Jones', phone_number: '+1122334455', email: 'mike@example.com', driver_license_number: 'DL987654' },
    { driver_id: '8',picture: '', first_name: 'Sarah', last_name: 'Adams', phone_number: '+1555666777', email: 'sarah@example.com', driver_license_number: 'DL345678' },
    { driver_id: '9',picture: '', first_name: 'David', last_name: 'Wilson', phone_number: '+1654321876', email: 'david@example.com', driver_license_number: 'DL876543' },
    { driver_id: '10',picture: '', first_name: 'Emily', last_name: 'Taylor', phone_number: '+1888888888', email: 'emily@example.com', driver_license_number: 'DL111222' },
    { driver_id: '11',picture: '', first_name: 'Michael', last_name: 'Johnson', phone_number: '+1999999999', email: 'michael@example.com', driver_license_number: 'DL333444' },
    { driver_id: '12',picture: '', first_name: 'Susan', last_name: 'Jackson', phone_number: '+1666666666', email: 'susan@example.com', driver_license_number: 'DL555666' },
    { driver_id: '13',picture: '', first_name: 'Robert', last_name: 'Smith', phone_number: '+1222222222', email: 'robert@example.com', driver_license_number: 'DL777888' },
    { driver_id: '14',picture: '', first_name: 'Linda', last_name: 'Davis', phone_number: '+1777777777', email: 'linda@example.com', driver_license_number: 'DL999000' },
    { driver_id: '15',picture: '', first_name: 'James', last_name: 'Johnson', phone_number: '+1888888888', email: 'james@example.com', driver_license_number: 'DL111222' },
    { driver_id: '16',picture: '', first_name: 'Patricia', last_name: 'Brown', phone_number: '+1666666666', email: 'patricia@example.com', driver_license_number: 'DL333444' },
    { driver_id: '17',picture: '', first_name: 'Richard', last_name: 'Taylor', phone_number: '+1777777777', email: 'richard@example.com', driver_license_number: 'DL555666' },
    { driver_id: '18',picture: '', first_name: 'Mary', last_name: 'Miller', phone_number: '+1222222222', email: 'mary@example.com', driver_license_number: 'DL777888' },
    { driver_id: '19',picture: '', first_name: 'William', last_name: 'Wilson', phone_number: '+1234567890', email: 'william@example.com', driver_license_number: 'DL123456' },
    { driver_id: '20',picture: '', first_name: 'Elizabeth', last_name: 'Jones', phone_number: '+1987654321', email: 'elizabeth@example.com', driver_license_number: 'DL654321' },
    { driver_id: '21',picture: '', first_name: 'David', last_name: 'Martin', phone_number: '+1122334455', email: 'david@example.com', driver_license_number: 'DL987654' },
    { driver_id: '22',picture: '', first_name: 'Jennifer', last_name: 'Garcia', phone_number: '+1555666777', email: 'jennifer@example.com', driver_license_number: 'DL345678' },
    { driver_id: '23',picture: '', first_name: 'John', last_name: 'Rodriguez', phone_number: '+1654321876', email: 'john@example.com', driver_license_number: 'DL876543' },
    { driver_id: '24',picture: '', first_name: 'Maria', last_name: 'Hernandez', phone_number: '+1888888888', email: 'maria@example.com', driver_license_number: 'DL111222' },
    { driver_id: '25',picture: '', first_name: 'James', last_name: 'Lopez', phone_number: '+1999999999', email: 'james@example.com', driver_license_number: 'DL333444' },
    { driver_id: '26',picture: '', first_name: 'Mary', last_name: 'Martinez', phone_number: '+1666666666', email: 'mary@example.com', driver_license_number: 'DL555666' },
    { driver_id: '27',picture: '', first_name: 'Michael', last_name: 'Adams', phone_number: '+1222222222', email: 'michael@example.com', driver_license_number: 'DL777888' },
    { driver_id: '28',picture: '', first_name: 'Maria', last_name: 'Nelson', phone_number: '+1777777777', email: 'maria@example.com', driver_license_number: 'DL999000' },
    { driver_id: '29',picture: '', first_name: 'John', last_name: 'Gonzalez', phone_number: '+1888888888', email: 'john@example.com', driver_license_number: 'DL111222' },
    { driver_id: '30',picture: '', first_name: 'Mary', last_name: 'Morales', phone_number: '+1666666666', email: 'mary@example.com', driver_license_number: 'DL333444' },
    { driver_id: '31',picture: '', first_name: 'James', last_name: 'Rivera', phone_number: '+1777777777', email: 'james@example.com', driver_license_number: 'DL555666' },
    { driver_id: '31',picture: '', first_name: 'Mary', last_name: 'Long', phone_number: '+1222222222', email: 'mary@example.com', driver_license_number: 'DL777888' },
  ];
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
