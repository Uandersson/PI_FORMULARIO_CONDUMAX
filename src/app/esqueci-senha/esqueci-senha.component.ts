import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent {
  sent = false;
  sending = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  enviar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.sending = true;
    const email = this.form.controls.email.value!;
    this.auth.requestPasswordReset(email).subscribe(() => {
      this.sending = false;
      this.sent = true;
    });
  }

  goLogin()   { this.router.navigate(['/login']); }
  goCadastro(){ this.router.navigate(['/cadastro']); }
}
