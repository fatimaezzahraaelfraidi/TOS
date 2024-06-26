import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../core/account.model';
import { User } from '../../core/user.model';

@Component({
  selector: 'app-add-user-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user-account.component.html',
  styleUrl: './add-user-account.component.scss'
})
export class AddUserAccountComponent implements OnInit{
  @Input() users: User[] = [];
  @Input() accounts: Account[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<{ user: User, account: Account }>();
  @Output() accountAdded = new EventEmitter<Account>();

  ngOnInit(): void {
    this.filteredUsers = this.users;
  }

  userChoice: string = '';
  newUser: User = {
    user_id: '',
    picture: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    cin: ''
  };
  newAccount: Account = {
    account_id: '',
    user_name: '',
    created_at: new Date(),
    role: '',
    user: null
  };
  drivingLicense: string = '';
  currentPage: number = 1;
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  availableRoles: string[] = [];
  searchText: string = '';

  constructor() {}

  closePopup() {
    this.close.emit();
  }

  nextPage() {
    if (this.currentPage < 3) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onRoleChange(event: any) {
    if (event.target.value === 'Driver') {
      this.drivingLicense = '';
    }
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => 
      (`${user.first_name}`.toLowerCase().startsWith(this.searchText.toLowerCase()) || 
      `${user.last_name}`.toLowerCase().startsWith(this.searchText.toLowerCase()) ||
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  onUserSelect() {
    if (this.selectedUser) {
      this.availableRoles = this.getAvailableRolesForUser(this.selectedUser);
    }
  }

  getAvailableRolesForUser(user: User): string[] {
    const userRoles = this.accounts.filter(account => account.user?.user_id === user.user_id).map(account => account.role);
    const allRoles = ['Admin', 'Fleet Manager', 'Analyst', 'Driver'];
    return allRoles.filter(role => !userRoles.includes(role));
  }

  get isExistingUserRoleLimitExceeded(): boolean {
    return this.selectedUser ? this.getAvailableRolesForUser(this.selectedUser).length === 0 : false;
  }

  onSubmit() {
    if (this.userChoice === 'new') {
      this.newUser.user_id = `u${Math.random().toString(36).substr(2, 9)}`;
      this.newAccount.account_id = `a${Math.random().toString(36).substr(2, 9)}`;
      this.newAccount.user_name = `${this.newUser.first_name.toLowerCase()}_${this.newUser.last_name.toLowerCase()}`;
      this.newAccount.created_at = new Date();
      this.newAccount.user = this.newUser;
      if (this.newAccount.role === 'Driver') {
        this.newAccount.user.cin = this.drivingLicense;
      }
      this.userAdded.emit({ user: this.newUser, account: this.newAccount });
    } else if (this.userChoice === 'existing' && this.selectedUser) {
      this.newAccount.account_id = `a${Math.random().toString(36).substr(2, 9)}`;
      this.newAccount.user_name = `${this.selectedUser.first_name.toLowerCase()}_${this.selectedUser.last_name.toLowerCase()}`;
      this.newAccount.created_at = new Date();
      this.newAccount.user = this.selectedUser;
      if (this.newAccount.role === 'Driver') {
        this.newAccount.user.cin = this.drivingLicense;
      }
      this.userAdded.emit({ user: this.selectedUser, account: this.newAccount});
    }
    this.closePopup();
  }
  navigateToPage(choice: 'new' | 'existing') {
    this.userChoice = choice;
      this.currentPage = 2; 
  }
}
