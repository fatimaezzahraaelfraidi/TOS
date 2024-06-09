import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Driver } from '../../core/driver.model';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'add-driver.component.html',
  styleUrl: 'add-driver.component.scss'
})
export class AddDriverComponent {
  @Output() close = new EventEmitter<void>();
  @Output() addDriver = new EventEmitter<Driver>();

  driver: Driver = {
    driver_id: '',
    picture: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    driver_license_number: ''
  };

  selectedFileName: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          this.driver.picture = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  addNewDriver() { 
    this.addDriver.emit(this.driver);
    this.close.emit();
  }
}
