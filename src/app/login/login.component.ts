import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    const { email, senha } = this.form.getRawValue();
    this.auth.login(email!, senha!).subscribe(ok => {
      this.loading = false;
      if (ok) this.router.navigate(['/home']);
      else this.error = 'Credenciais inválidas.';
    });
  }

  goCadastro() { this.router.navigate(['/cadastro']); }
  goEsqueci() { this.router.navigate(['/esqueci-senha']); }
}
