// src/app/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgFor, NgIf],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuarios: Usuario[] = [];
  mensagem = '';

  form = this.fb.group({
    user: ['', Validators.required],
    senha: ['', Validators.required],
    role: ['user', Validators.required],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarios = this.auth.listarUsuarios();
  }

  createUser() {
    this.mensagem = '';

    if (this.form.invalid) {
      this.mensagem = 'Preencha todos os campos.';
      return;
    }

    // Garantir que role seja do tipo correto
    const { user, senha, role } = this.form.value;
    const roleTyped = role as 'user' | 'admin';

    const sucesso = this.auth.criarUsuario(user!, senha!, roleTyped);

    if (!sucesso) {
      this.mensagem = 'Usuário já existe.';
      return;
    }

    this.mensagem = 'Usuário criado com sucesso!';
    this.form.reset({ role: 'user' });
    this.carregarUsuarios();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
