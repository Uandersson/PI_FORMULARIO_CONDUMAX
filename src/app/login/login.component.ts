// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  error = '';

  form = this.fb.group({
    user: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Se já estiver logado, redireciona automaticamente (debug-friendly)
    if (this.auth.isLogged()) {
      const role = this.auth.getRole();
      console.log('[Login] já logado, role:', role);
      this.router.navigate([role === 'admin' ? '/admin' : '/home']);
    }
  }

  submit() {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Preencha todos os campos corretamente.';
      return;
    }

    const { user, senha } = this.form.getRawValue();
    console.log('[Login] Tentando login com:', { user, senha }); // <-- ver no console
    this.loading = true;

    this.auth.login(user!, senha!).subscribe({
      next: (response) => {
        console.log('[Login] resposta do auth:', response); // <-- ver no console
        this.loading = false;

        if (!response.ok) {
          this.error = 'Credenciais inválidas.';
          return;
        }

        // tenta navegar e loga resultado (debug)
        const target = response.role === 'admin' ? '/admin' : '/home';
        this.router.navigateByUrl(target)
          .then(r => console.log('[Login] navigateByUrl result:', r, 'target:', target))
          .catch(err => {
            console.error('[Login] erro ao navegar:', err);
            this.error = 'Erro ao navegar para ' + target;
          });
      },
      error: (err) => {
        console.error('[Login] erro do subscribe:', err);
        this.loading = false;
        this.error = 'Erro ao tentar entrar.';
      }
    });
  }
}
