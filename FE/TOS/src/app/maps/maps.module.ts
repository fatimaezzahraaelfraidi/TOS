import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { ShowCoordinatesComponent } from './show-coordinates/show-coordinates.component';



@NgModule({
  declarations: [
    ShowCoordinatesComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCDIGTD49GEgMvz4Czl_2g3IWoDENl2ARc'
    })
  ]
})
export class MapsModule { }
 