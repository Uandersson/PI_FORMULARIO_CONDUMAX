import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  loading = false;

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(3)]],
    confirmar: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { senha, confirmar } = this.form.getRawValue();
    if (senha !== confirmar) { alert('As senhas não conferem.'); return; }

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      alert('Cadastrado com sucesso (mock)!');
      this.router.navigate(['/login']);
    }, 700);
  }

  goLogin() { this.router.navigate(['/login']); }
}
