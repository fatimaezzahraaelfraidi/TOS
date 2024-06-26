import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/user.model';
import { Account } from '../../core/account.model';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  @Input() user!: User;
  @Input() accounts!: Account[]
  @Output() close = new EventEmitter<void>();
  @Output() updateExistingUser = new EventEmitter<User>();

  updateUser() {
    this.updateExistingUser.emit(this.user);
    this.close.emit();
  }
  getEarliestAccountDateForUser(): Date | null {
    
    if (this.accounts.length === 0) return null;
    return this.accounts.reduce((earliest, account) => {
      return !earliest || account.created_at < earliest ? account.created_at : earliest;
    }, null as Date | null);
  }

  getAccountRolesForUser(): string[] {
    return this.accounts.map(account => account.role);
  }

  getRoleColor(status: string): string {
    switch (status.toLowerCase()) {
        case "driver":
            return "#0E4CAA"; 
        case "fleet manager":
            return "#1F8C03";
        case "admin":
            return "#AA0E0E"; 
        case "analyst":
            return "#D96109";
        default:
            return "#fff";
    }
  } 
}
