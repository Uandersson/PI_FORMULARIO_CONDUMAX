// src/app/admin/admin.component.ts
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgFor, NgIf],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  usuarios: any[] = [];

  form = this.fb.group({
    user: ['', Validators.required],
    senha: ['', Validators.required],
    role: ['user', Validators.required],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  createUser() {
    if (this.form.valid) {
      this.usuarios.push(this.form.value);
      this.form.reset({ role: 'user' });
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
