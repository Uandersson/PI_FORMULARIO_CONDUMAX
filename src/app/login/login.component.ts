import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form = this.fb.group({
    user: ['', Validators.required],
    senha: ['', Validators.required],
  });

  erroLogin = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  login() {
    if (this.form.invalid) return;

    const { user, senha } = this.form.value;
    this.auth.login(user!, senha!).subscribe((res) => {
      if (res.ok) {
        this.erroLogin = false;
        if (res.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          alert('Acesso negado — apenas administradores podem entrar.');
        }
      } else {
        this.erroLogin = true;
      }
    });
  }
}
