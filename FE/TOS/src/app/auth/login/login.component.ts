import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { MyGlobalServiceService } from '../../my-global-service.service';
import { SharedModule } from '../../shared/shared.module';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,LoaderComponent],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private router: Router,private globalService: MyGlobalServiceService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.loading = true;
    // Assuming you validate credentials here; for demonstration, check if username is 'aaa'
    setTimeout(() => {
      if (username.toLowerCase() === 'admin') {
        this.globalService.updateRoleForUsername(username, 'admin');
        this.router.navigate(['/users-list']);
      } else if (username.toLowerCase() === 'fleet manager') {
        this.globalService.updateRoleForUsername(username, 'fleet manager');
        this.router.navigate(['/vehicles']);
      } else if (username.toLowerCase() === 'analyst') {
        this.globalService.updateRoleForUsername(username, 'analyst');
        this.router.navigate(['/analysis']);
      } else {
        // Handle invalid username/password scenario
        console.log('Invalid username or password');
      }

      this.loading = false; // Hide loader after navigation
    }, 500); // Simulate a 5-second delay
  }
}
