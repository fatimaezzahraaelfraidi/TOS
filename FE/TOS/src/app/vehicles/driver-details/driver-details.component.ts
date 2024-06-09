import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Driver } from '../../core/driver.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-driver-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'driver-details.component.html',
  styleUrl: 'driver-details.component.scss'
})
export class DriverDetailsComponent {
  @Input()
  driver!: Driver;
  @Output() close = new EventEmitter<void>();
  @Output() updateExistingDriver = new EventEmitter<Driver>();

  updateDriver() {
    this.updateExistingDriver.emit(this.driver);
    this.close.emit();
  }
}
