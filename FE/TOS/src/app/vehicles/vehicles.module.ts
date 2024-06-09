import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { DepotListComponent } from './depot-list/depot-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AgmCoreModule } from '@agm/core';
import { ShowCoordinatesComponent } from '../maps/show-coordinates/show-coordinates.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    VehicleListComponent,
    DriverListComponent,
    DepotListComponent,
    AddVehicleComponent,
    VehicleDetailsComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCDIGTD49GEgMvz4Czl_2g3IWoDENl2ARc'
    }),
    ShowCoordinatesComponent,
    MatDialogModule
  ],
  exports: [VehicleListComponent]
})
export class VehiclesModule { }
