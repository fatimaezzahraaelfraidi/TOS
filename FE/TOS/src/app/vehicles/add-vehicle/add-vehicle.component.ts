import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Vehicle } from '../../core/vehicle.model';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'add-vehicle.component.html',
  styleUrls: ['add-vehicle.component.scss']
})
export class AddVehicleComponent {
  @Output() close = new EventEmitter<void>();
  @Output() addVehicle = new EventEmitter<Vehicle>();

  vehicle: Vehicle = {
    registration: '',
    modelBrand: '',
    fuelType: '',
    capacity: 0 ,
    volume: 0,
    current_latitude: '',
    current_longitude: '',
    driver_id: ''
  };

  addNewVehicle() { 
    this.addVehicle.emit(this.vehicle);
    this.close.emit();
  }
}