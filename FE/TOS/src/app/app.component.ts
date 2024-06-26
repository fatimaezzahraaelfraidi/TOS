import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,NavbarComponent,CommonModule,FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TOS';
  constructor(private router: Router) {}

  // Method to check if the current route is either 'login' or 'register'
  shouldShowNavbar(): boolean {
    const currentRoute = this.router.url;
    return !(currentRoute === '/login' || currentRoute === '/register' || currentRoute === '/' );
  }
  // Method to check if the current route is either 'login' or 'register'
  shouldShowSidebar(): boolean {
    const currentRoute = this.router.url;
    return !(currentRoute === '/login' || currentRoute === '/register' || currentRoute === '/users-list' || currentRoute === '/' );
  }
}
