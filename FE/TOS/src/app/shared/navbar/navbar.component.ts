import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../core/navigation.service';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { MyGlobalServiceService } from '../../my-global-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activeLink: string = '';
  role: string = '';
  username: string = '';
  showUserMenu: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private globalService: MyGlobalServiceService,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setActiveLink();
      });
    this.setActiveLink();
    this.role = this.globalService.role;
    this.username = this.globalService.username;
  }

  setActiveLink() {
    const currentRoute = this.route.root.firstChild?.snapshot.url[0]?.path;
    this.activeLink = currentRoute || '';
  }

  onNavItemClicked(item: string) {
    this.navigationService.selectNavItem(item);
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    //this.authService.logout();
    this.router.navigate(['/login']);
  }
}
