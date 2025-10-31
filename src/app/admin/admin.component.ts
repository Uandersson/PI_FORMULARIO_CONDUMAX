import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AuthService, Usuario } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  usuarios: Usuario[] = [];
  editando: Usuario | null = null;

  form = this.fb.group({
    user: ['', Validators.required],
    senha: ['', Validators.required],
    role: ['user', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.auth.listarUsuarios().subscribe({
      next: (data) => (this.usuarios = data),
      error: () => alert('Erro ao carregar usuários.'),
    });
  }

  salvarUsuario() {
    if (this.form.invalid) return;

    const usuario = this.form.value as Usuario;

    if (this.editando) {
      this.auth.atualizarUsuario(this.editando.id!, usuario).subscribe({
        next: () => {
          this.carregarUsuarios();
          this.cancelarEdicao();
        },
      });
    } else {
      this.auth.criarUsuario(usuario).subscribe({
        next: () => this.carregarUsuarios(),
        error: () => alert('Usuário já existe ou erro ao criar.'),
      });
    }

    this.form.reset({ role: 'user' });
  }

  editar(u: Usuario) {
    this.editando = u;
    this.form.patchValue(u);
  }

  excluir(id?: number) {
    if (!id) return;
    if (!confirm('Excluir este usuário?')) return;

    this.auth.excluirUsuario(id).subscribe({
      next: () => this.carregarUsuarios(),
    });
  }

  cancelarEdicao() {
    this.editando = null;
    this.form.reset({ role: 'user' });
  }

  logout() {
    this.auth.logout();
  }
}
