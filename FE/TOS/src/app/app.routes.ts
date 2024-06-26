import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'vehicles', loadComponent: () => import('./vehicles/vehicle-list/vehicle-list.component').then(m => m.VehicleListComponent) },
  { path: 'drivers', loadComponent: () => import('./vehicles/driver-list/driver-list.component').then(m => m.DriverListComponent) },
  { path: 'depot', loadComponent: () => import('./vehicles/depot-list/depot-list.component').then(m => m.DepotListComponent) },
  { path: 'planning', loadComponent: () => import('./planning/planning/planning.component').then(m => m.PlanningComponent) },
  { path: 'loading', loadComponent: () => import('./planning/loading/loading.component').then(m => m.LoadingComponent) },
  { path: 'delivery-orders', loadComponent: () => import('./planning/delivery-orders/delivery-orders.component').then(m => m.DeliveryOrdersComponent) },
  { path: 'tracking', loadComponent: () => import('./tracking/tour-map/tour-map.component').then(m => m.TourMapComponent) },
  { path: 'tour-map', loadComponent: () => import('./tracking/tour-map/tour-map.component').then(m => m.TourMapComponent) },
  { path: 'delivery-list', loadComponent: () => import('./tracking/delivery-list/delivery-list.component').then(m => m.DeliveryListComponent) },
  { path: 'users-list', loadComponent: () => import('./users/users-list/users-list.component').then(m => m.UsersListComponent) },
];
