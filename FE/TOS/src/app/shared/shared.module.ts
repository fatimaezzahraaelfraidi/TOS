import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    // NavbarComponent,
    // SidebarComponent,
    // LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    // NavbarComponent,
    // SidebarComponent,
    // LoaderComponent
  ]
})
export class SharedModule { }
