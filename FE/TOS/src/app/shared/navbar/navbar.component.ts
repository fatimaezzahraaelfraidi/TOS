import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../core/navigation.service';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activeLink: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setActiveLink();
      });
    this.setActiveLink();
  }

  setActiveLink() {
    const currentRoute = this.route.root.firstChild?.snapshot.url[0]?.path;
    this.activeLink = currentRoute || '';
  }

  onNavItemClicked(item: string) {
    this.navigationService.selectNavItem(item);
  }
}
