import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../core/navigation.service';
import { CommonModule } from '@angular/common';

// Define a type for the keys of sidebarConfig
type SidebarConfigKey = 'vehicles' | 'planning' | 'tracking';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: 'sidebar.component.html',
  styleUrl: 'sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  sidebarItems: any[] = [];

  private sidebarConfig = {
    vehicles: [
      { link: '/vehicles', icon: 'fa-truck', label: 'Vehicles' },
      { link: '/drivers', icon: 'fa-id-card', label: 'Drivers' },
      { link: '/depot', icon: 'fa-home', label: 'Depot' },
    ],
    planning: [
      { link: '/loading', icon: 'fa-box', label: 'Loading' },
      { link: '/delivery-orders', icon: 'fa-list', label: 'Delivery Orders' },
      { link: '/planning', icon: 'fa-calendar', label: 'Planning' },
    ],
    tracking: [
      { link: '/tour-map', icon: 'fa-map', label: 'Tours Map' },
      { link: '/delivery-list', icon: 'fa-list', label: 'Delivery List' },
    ],
  };

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.navigationService.selectedNavItem$.subscribe((item: string) => {
      const key = item as SidebarConfigKey; // Cast item to SidebarConfigKey
      this.sidebarItems = this.sidebarConfig[key];
    });
  }
}
