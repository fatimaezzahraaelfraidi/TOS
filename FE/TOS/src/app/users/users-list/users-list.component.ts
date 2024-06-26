import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from '../../core/user.model';
import { Account } from '../../core/account.model';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { AddUserAccountComponent } from '../add-user-account/add-user-account.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,UserDetailsComponent,AddUserAccountComponent],
  templateUrl: 'users-list.component.html',
  styleUrl: 'users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  users: User[] = [
    { user_id: 'u1', picture: '', first_name: 'Alice', last_name: 'Smith', email: 'alice.smith@example.com', phone_number: '1234567890', cin: 'A123456' },
    { user_id: 'u2', picture: '', first_name: 'Bob', last_name: 'Johnson', email: 'bob.johnson@example.com', phone_number: '1234567891', cin: 'B123456' },
    { user_id: 'u3', picture: '', first_name: 'Charlie', last_name: 'Williams', email: 'charlie.williams@example.com', phone_number: '1234567892', cin: 'C123456' },
    { user_id: 'u4', picture: '', first_name: 'David', last_name: 'Brown', email: 'david.brown@example.com', phone_number: '1234567893', cin: 'D123456' },
    { user_id: 'u5', picture: '', first_name: 'Eve', last_name: 'Jones', email: 'eve.jones@example.com', phone_number: '1234567894', cin: 'E123456' },
    { user_id: 'u6', picture: '', first_name: 'Frank', last_name: 'Garcia', email: 'frank.garcia@example.com', phone_number: '1234567895', cin: 'F123456' },
    { user_id: 'u7', picture: '', first_name: 'Grace', last_name: 'Martinez', email: 'grace.martinez@example.com', phone_number: '1234567896', cin: 'G123456' },
    { user_id: 'u8', picture: '', first_name: 'Hank', last_name: 'Rodriguez', email: 'hank.rodriguez@example.com', phone_number: '1234567897', cin: 'H123456' },
    { user_id: 'u9', picture: '', first_name: 'Ivy', last_name: 'Wilson', email: 'ivy.wilson@example.com', phone_number: '1234567898', cin: 'I123456' },
    { user_id: 'u10', picture: '', first_name: 'Jack', last_name: 'Anderson', email: 'jack.anderson@example.com', phone_number: '1234567899', cin: 'J123456' },
    { user_id: 'u11', picture: '', first_name: 'Karen', last_name: 'Thomas', email: 'karen.thomas@example.com', phone_number: '1234567800', cin: 'K123456' },
    { user_id: 'u12', picture: '', first_name: 'Larry', last_name: 'Taylor', email: 'larry.taylor@example.com', phone_number: '1234567801', cin: 'L123456' },
    { user_id: 'u13', picture: '', first_name: 'Mona', last_name: 'Moore', email: 'mona.moore@example.com', phone_number: '1234567802', cin: 'M123456' },
    { user_id: 'u14', picture: '', first_name: 'Nina', last_name: 'Jackson', email: 'nina.jackson@example.com', phone_number: '1234567803', cin: 'N123456' },
    { user_id: 'u15', picture: '', first_name: 'Oscar', last_name: 'Harris', email: 'oscar.harris@example.com', phone_number: '1234567804', cin: 'O123456' }
  ];

  accounts: Account[] = [
    { account_id: 'a1', user_name: 'alice_smith', created_at: new Date('2023-01-15'), role: 'Admin', user: this.users[0] },
    { account_id: 'a2', user_name: 'bob_johnson', created_at: new Date('2023-02-20'), role: 'Driver', user: this.users[1] },
    { account_id: 'a3', user_name: 'charlie_williams', created_at: new Date('2023-03-25'), role: 'Analyst', user: this.users[2] },
    { account_id: 'a4', user_name: 'david_brown', created_at: new Date('2023-04-30'), role: 'Fleet Manager', user: this.users[3] },
    { account_id: 'a5', user_name: 'eve_jones', created_at: new Date('2023-05-05'), role: 'Driver', user: this.users[4] },
    { account_id: 'a6', user_name: 'frank_garcia', created_at: new Date('2023-06-10'), role: 'Admin', user: this.users[5] },
    { account_id: 'a7', user_name: 'grace_martinez', created_at: new Date('2023-07-15'), role: 'Driver', user: this.users[6] },
    { account_id: 'a8', user_name: 'hank_rodriguez', created_at: new Date('2023-08-20'), role: 'Analyst', user: this.users[7] },
    { account_id: 'a9', user_name: 'ivy_wilson', created_at: new Date('2023-09-25'), role: 'Fleet Manager', user: this.users[7] },
    { account_id: 'a10', user_name: 'jack_anderson', created_at: new Date('2023-10-30'), role: 'Driver', user: this.users[9] },
    { account_id: 'a11', user_name: 'karen_thomas', created_at: new Date('2023-11-05'), role: 'Admin', user: this.users[10] },
    { account_id: 'a12', user_name: 'larry_taylor', created_at: new Date('2023-12-10'), role: 'Driver', user: this.users[11] },
    { account_id: 'a13', user_name: 'mona_moore', created_at: new Date('2023-11-15'), role: 'Analyst', user: this.users[12] },
    { account_id: 'a14', user_name: 'nina_jackson', created_at: new Date('2023-10-20'), role: 'Fleet Manager', user: this.users[13] },
    { account_id: 'a15', user_name: 'oscar_harris', created_at: new Date('2023-09-25'), role: 'Driver', user: this.users[14] },
    { account_id: 'a16', user_name: 'charlie_williams2', created_at: new Date('2023-04-25'), role: 'Fleet Manager', user: this.users[2] },
    { account_id: 'a17', user_name: 'hank_rodriguez2', created_at: new Date('2023-05-20'), role: 'Driver', user: this.users[8] },
    { account_id: 'a18', user_name: 'charlie_williams3', created_at: new Date('2023-06-25'), role: 'Analyst', user: this.users[3] }
  ];
  
  
    filteredUsers: User[] = [];
    selectedUsers: User[] = [];
    selectUserAccounts: Account[] = [] ;
    searchText = '';
    selectedRole = '';
    currentPage = 1;
    itemsPerPage = 11;
    pages: number[] = [];
    selectAllCheckbox: boolean = false;
    selectedUserIds: string[] = [];
    selectedUser: User | null = null;
    newUserId: string | null = null; 
    
    showAddUserPopup: boolean = false;
  
    ngOnInit() {
      this.filteredUsers = [...this.users];
      this.updatePagination();
    }

    getAccountsForUser(user: User): Account[] {
      return this.accounts.filter(account => account.user?.user_id === user.user_id);
    }
  
    getEarliestAccountDateForUser(user: User): Date | null {
      const userAccounts = this.getAccountsForUser(user);
      if (userAccounts.length === 0) return null;
      return userAccounts.reduce((earliest, account) => {
        return !earliest || account.created_at < earliest ? account.created_at : earliest;
      }, null as Date | null);
    }
  
    getAccountRolesForUser(user: User): string[] {
      const userAccounts = this.getAccountsForUser(user);
      return userAccounts.map(account => account.role);
    }
  
    filterUsers() {
      this.filteredUsers = this.users.filter(user =>
        (user.first_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
         user.last_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
         user.email.toLowerCase().includes(this.searchText.toLowerCase())) &&
        (this.selectedRole === '' || this.getAccountRolesForUser(user).includes(this.selectedRole))
      );
      this.updatePagination();
    }
  
    selectAll(event: Event) {
      const checkbox = event.target as HTMLInputElement;
      this.selectAllCheckbox = checkbox.checked;
      if (this.selectAllCheckbox) {
        this.selectedUserIds = this.filteredUsers.map(user => user.user_id);
        this.selectedUsers = [...this.filteredUsers];
      } else {
        this.selectedUserIds = [];
        this.selectedUsers = [];
      }
    }
  
    toggleSelection(user: User) {
      const index = this.selectedUserIds.indexOf(user.user_id);
      if (index === -1) {
        this.selectedUserIds.push(user.user_id);
        this.selectedUsers.push(user);
      } else {
        this.selectedUserIds.splice(index, 1);
        this.selectedUsers = this.selectedUsers.filter(v => v.user_id !== user.user_id);
      }
    }
  
    deleteSelected() {
      this.users = this.users.filter(user => !this.selectedUsers.includes(user));
      this.selectedUsers = [];
      this.filterUsers();
    }
  
    openUserDetails(user: User) {
      this.selectedUser = user;
      this.selectUserAccounts = this.getAccountsForUser(user);
    }
  
    closeUserDetails() {
      this.selectedUser = null;
      this.selectUserAccounts = [];
    }
  
    addNewUser(event: { user: User, account: Account }) {
      this.users.push(event.user);
      this.accounts.push(event.account);
      this.newUserId = event.user.user_id;
      this.filterUsers();
      this.highlightNewUser();
    }
  
    updatePagination() {
      this.pages = [];
      for (let i = 1; i <= Math.ceil(this.filteredUsers.length / this.itemsPerPage); i++) {
        this.pages.push(i);
      }
    }
  
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePagination();
      }
    }
  
    nextPage() {
      if (this.currentPage < this.pages.length) {
        this.currentPage++;
        this.updatePagination();
      }
    }
  
    goToPage(page: number) {
      this.currentPage = page;
      this.updatePagination();
    }
  
    highlightNewUser() {
      const index = this.filteredUsers.findIndex(user => user.user_id === this.newUserId);
      if (index !== -1) {
        this.currentPage = Math.ceil((index + 1) / this.itemsPerPage);
        this.updatePagination();
        setTimeout(() => {
          this.newUserId = null; // Reset the new user ID after highlighting
        }, 2000); // Highlight duration
      }
    }
  
  
    openAddUserPopup() {
      this.showAddUserPopup = true;
    }
  
    closeAddUserPopup() {
      this.showAddUserPopup = false;
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
