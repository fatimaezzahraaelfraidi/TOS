import { Injectable } from '@angular/core';
import { User } from './core/user.model';
import { Vehicle } from './core/vehicle.model';
import { Driver } from './core/driver.model';

@Injectable({
  providedIn: 'root'
})
export class MyGlobalServiceService {
  username: string;
  role: string;
  vehicles: Vehicle[];
  drivers: Driver[];
  constructor() {
    this.username = '';
    this.role = '';
    this.vehicles = [
      // Sample data, replace with your actual data
      { registration: 'MA-14567', modelBrand: 'Toyota Camry', fuelType: 'Diesel', capacity: 1, volume: 1000, current_latitude: '', current_longitude: '', driver_id: 'dr_1' },
      { registration: 'MA-42567', modelBrand: 'Honda Accord', fuelType: 'Gasoline', capacity: 3, volume: 2000, current_latitude: '', current_longitude: '', driver_id: 'dr_2' },
      { registration: 'MA-45367', modelBrand: 'Toyota Camry', fuelType: 'Diesel', capacity: 3, volume: 3000, current_latitude: '', current_longitude: '', driver_id: 'dr_3' },
      { registration: 'MA-45647', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 1, volume: 4000, current_latitude: '', current_longitude: '', driver_id: 'dr_4' },
      { registration: 'MA-54567', modelBrand: 'Toyota Camry', fuelType: 'Gasoline', capacity: 2, volume: 5000, current_latitude: '', current_longitude: '', driver_id: 'dr_5' },
      { registration: 'MA-46567', modelBrand: 'Toyota Camry', fuelType: 'Gasoline', capacity: 1, volume: 1000, current_latitude: '', current_longitude: '', driver_id: 'dr_6' },
      { registration: 'MA-45767', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 2, volume: 2000, current_latitude: '', current_longitude: '', driver_id: 'dr_7' },
      { registration: 'MA-45687', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 3, volume: 3000, current_latitude: '', current_longitude: '', driver_id: 'dr_8' },
      { registration: 'MA-45679', modelBrand: 'Honda Accord', fuelType: 'Gasoline', capacity: 5, volume: 4000, current_latitude: '', current_longitude: '', driver_id: 'dr_9' },
      { registration: 'MA-94567', modelBrand: 'Toyota Camry', fuelType: 'Diesel', capacity: 1, volume: 5000, current_latitude: '', current_longitude: '', driver_id: 'dr_10' },
      { registration: 'MA-48567', modelBrand: 'Honda Accord', fuelType: 'Gasoline', capacity: 3, volume: 1000, current_latitude: '', current_longitude: '', driver_id: 'dr_11' },
      { registration: 'MA-45767', modelBrand: 'Toyota Camry', fuelType: 'Diesel', capacity: 3, volume: 2000, current_latitude: '', current_longitude: '', driver_id: 'dr_12' },
      { registration: 'MA-45667', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 1, volume: 3000, current_latitude: '', current_longitude: '', driver_id: 'dr_13' },
      { registration: 'MA-45675', modelBrand: 'Toyota Camry', fuelType: 'Gasoline', capacity: 2, volume: 4000, current_latitude: '', current_longitude: '', driver_id: 'dr_14' },
      { registration: 'MA-44567', modelBrand: 'Toyota Camry', fuelType: 'Gasoline', capacity: 1, volume: 5000, current_latitude: '', current_longitude: '', driver_id: 'dr_15' },
      { registration: 'MA-45567', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 2, volume: 1000, current_latitude: '', current_longitude: '', driver_id: 'dr_16' },
      { registration: 'MA-45267', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 3, volume: 2000, current_latitude: '', current_longitude: '', driver_id: 'dr_17' },
      { registration: 'MA-45667', modelBrand: 'Honda Accord', fuelType: 'Gasoline', capacity: 5, volume: 3000, current_latitude: '', current_longitude: '', driver_id: 'dr_18' },
      { registration: 'MA-45672', modelBrand: 'Toyota Camry', fuelType: 'Diesel', capacity: 1, volume: 4000, current_latitude: '', current_longitude: '', driver_id: 'dr_19' },
      { registration: 'MA-45671', modelBrand: 'Honda Accord', fuelType: 'Gasoline', capacity: 3, volume: 5000, current_latitude: '', current_longitude: '', driver_id: 'dr_20' },
      { registration: 'MA-45627', modelBrand: 'Toyota Camry', fuelType: 'Diesel', capacity: 3, volume: 1000, current_latitude: '', current_longitude: '', driver_id: 'dr_21' },
      { registration: 'MA-45567', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 1, volume: 2000, current_latitude: '', current_longitude: '', driver_id: 'dr_22' },
      { registration: 'MA-45367', modelBrand: 'Toyota Camry', fuelType: 'Gasoline', capacity: 2, volume: 3000, current_latitude: '', current_longitude: '', driver_id: 'dr_23' },
      { registration: 'MA-451167', modelBrand: 'Toyota Camry', fuelType: 'Gasoline', capacity: 1, volume: 4000, current_latitude: '', current_longitude: '', driver_id: 'dr_24' },
      { registration: 'MA-456357', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 2, volume: 5000, current_latitude: '', current_longitude: '', driver_id: 'dr_25' },
      { registration: 'MA-4562237', modelBrand: 'Honda Accord', fuelType: 'Diesel', capacity: 3, volume: 1000, current_latitude: '', current_longitude: '', driver_id: 'dr_26' },
      { registration: 'MA-456723', modelBrand: 'Honda Accord', fuelType: 'Gasoline', capacity: 5, volume: 2000, current_latitude: '', current_longitude: '', driver_id: 'dr_27' }
    ];
    this.drivers = [
      { driver_id: 'dr_1',picture: '', first_name: 'John', last_name: ' Doe', phone_number: '+1234567890', email: 'john@example.com', driver_license_number: 'DL123456' },
      { driver_id: 'dr_2',picture: '', first_name: 'Jane ', last_name: ' Smith', phone_number: '+1987654321', email: 'jane@example.com', driver_license_number: 'DL654321' }, 
      { driver_id: 'dr_3',picture: '', first_name: 'Mike', last_name: 'Jones', phone_number: '+1122334455', email: 'mike@example.com', driver_license_number: 'DL987654' }, 
      { driver_id: 'dr_4',picture: '', first_name: 'Sarah', last_name: 'Adams', phone_number: '+1555666777', email: 'sarah@example.com', driver_license_number: 'DL345678' }, 
      { driver_id: 'dr_5',picture: '', first_name: 'John', last_name: ' Doe', phone_number: '+1234567890', email: 'john@example.com', driver_license_number: 'DL123456' },
      { driver_id: 'dr_6',picture: '', first_name: 'Jane ', last_name: ' Smith', phone_number: '+1987654321', email: 'jane@example.com', driver_license_number: 'DL654321' },
      { driver_id: 'dr_7',picture: '', first_name: 'Mike', last_name: 'Jones', phone_number: '+1122334455', email: 'mike@example.com', driver_license_number: 'DL987654' },
      { driver_id: 'dr_8',picture: '', first_name: 'Sarah', last_name: 'Adams', phone_number: '+1555666777', email: 'sarah@example.com', driver_license_number: 'DL345678' },
      { driver_id: 'dr_9',picture: '', first_name: 'David', last_name: 'Wilson', phone_number: '+1654321876', email: 'david@example.com', driver_license_number: 'DL876543' },
      { driver_id: 'dr_10',picture: '', first_name: 'Emily', last_name: 'Taylor', phone_number: '+1888888888', email: 'emily@example.com', driver_license_number: 'DL111222' },
      { driver_id: 'dr_11',picture: '', first_name: 'Michael', last_name: 'Johnson', phone_number: '+1999999999', email: 'michael@example.com', driver_license_number: 'DL333444' },
      { driver_id: 'dr_12',picture: '', first_name: 'Susan', last_name: 'Jackson', phone_number: '+1666666666', email: 'susan@example.com', driver_license_number: 'DL555666' },
      { driver_id: 'dr_13',picture: '', first_name: 'Robert', last_name: 'Smith', phone_number: '+1222222222', email: 'robert@example.com', driver_license_number: 'DL777888' },
      { driver_id: 'dr_14',picture: '', first_name: 'Linda', last_name: 'Davis', phone_number: '+1777777777', email: 'linda@example.com', driver_license_number: 'DL999000' },
      { driver_id: 'dr_15',picture: '', first_name: 'James', last_name: 'Johnson', phone_number: '+1888888888', email: 'james@example.com', driver_license_number: 'DL111222' },
      { driver_id: 'dr_16',picture: '', first_name: 'Patricia', last_name: 'Brown', phone_number: '+1666666666', email: 'patricia@example.com', driver_license_number: 'DL333444' },
      { driver_id: 'dr_17',picture: '', first_name: 'Richard', last_name: 'Taylor', phone_number: '+1777777777', email: 'richard@example.com', driver_license_number: 'DL555666' },
      { driver_id: 'dr_18',picture: '', first_name: 'Mary', last_name: 'Miller', phone_number: '+1222222222', email: 'mary@example.com', driver_license_number: 'DL777888' },
      { driver_id: 'dr_19',picture: '', first_name: 'William', last_name: 'Wilson', phone_number: '+1234567890', email: 'william@example.com', driver_license_number: 'DL123456' },
      { driver_id: 'dr_20',picture: '', first_name: 'Elizabeth', last_name: 'Jones', phone_number: '+1987654321', email: 'elizabeth@example.com', driver_license_number: 'DL654321' },
      { driver_id: 'dr_21',picture: '', first_name: 'David', last_name: 'Martin', phone_number: '+1122334455', email: 'david@example.com', driver_license_number: 'DL987654' },
      { driver_id: 'dr_22',picture: '', first_name: 'Jennifer', last_name: 'Garcia', phone_number: '+1555666777', email: 'jennifer@example.com', driver_license_number: 'DL345678' },
      { driver_id: 'dr_23',picture: '', first_name: 'John', last_name: 'Rodriguez', phone_number: '+1654321876', email: 'john@example.com', driver_license_number: 'DL876543' },
      { driver_id: 'dr_24',picture: '', first_name: 'Maria', last_name: 'Hernandez', phone_number: '+1888888888', email: 'maria@example.com', driver_license_number: 'DL111222' },
      { driver_id: 'dr_25',picture: '', first_name: 'James', last_name: 'Lopez', phone_number: '+1999999999', email: 'james@example.com', driver_license_number: 'DL333444' },
      { driver_id: 'dr_26',picture: '', first_name: 'Mary', last_name: 'Martinez', phone_number: '+1666666666', email: 'mary@example.com', driver_license_number: 'DL555666' },
      { driver_id: 'dr_27',picture: '', first_name: 'Michael', last_name: 'Adams', phone_number: '+1222222222', email: 'michael@example.com', driver_license_number: 'DL777888' },
      { driver_id: 'dr_28',picture: '', first_name: 'Maria', last_name: 'Nelson', phone_number: '+1777777777', email: 'maria@example.com', driver_license_number: 'DL999000' },
      { driver_id: 'dr_29',picture: '', first_name: 'John', last_name: 'Gonzalez', phone_number: '+1888888888', email: 'john@example.com', driver_license_number: 'DL111222' },
      { driver_id: 'dr_30',picture: '', first_name: 'Mary', last_name: 'Morales', phone_number: '+1666666666', email: 'mary@example.com', driver_license_number: 'DL333444' },
      { driver_id: 'dr_31',picture: '', first_name: 'James', last_name: 'Rivera', phone_number: '+1777777777', email: 'james@example.com', driver_license_number: 'DL555666' },
      { driver_id: 'dr_31',picture: '', first_name: 'Mary', last_name: 'Long', phone_number: '+1222222222', email: 'mary@example.com', driver_license_number: 'DL777888' },
    ];
  }

  updateRoleForUsername(username: string, role: string) {
    this.username = username;
    this.role = role;
  }
  
}
