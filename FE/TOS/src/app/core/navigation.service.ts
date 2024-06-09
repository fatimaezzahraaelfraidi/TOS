import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private selectedNavItemSubject = new BehaviorSubject<string>('vehicles');
  selectedNavItem$ = this.selectedNavItemSubject.asObservable();

  selectNavItem(item: string) {
    this.selectedNavItemSubject.next(item);
  }
}