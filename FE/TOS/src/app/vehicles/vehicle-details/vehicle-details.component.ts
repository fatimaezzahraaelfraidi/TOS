import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from '../../core/vehicle.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'vehicle-details.component.html',
  styleUrl: 'vehicle-details.component.scss'
})

export class VehicleDetailsComponent {
  @Input()
  vehicle!: Vehicle;
  @Output() close = new EventEmitter<void>();
  @Output() updateExistingVehicle = new EventEmitter<Vehicle>();

  updateVehicle() {
    this.updateExistingVehicle.emit(this.vehicle);
    this.close.emit();
  }
}
