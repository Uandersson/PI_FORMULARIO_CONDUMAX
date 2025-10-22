import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface Usuario {
  user: string;
  senha: string;
  role: 'admin' | 'user';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private logged = false;
  private role: 'admin' | 'user' | null = null;

  constructor(private router: Router) {
    const saved = localStorage.getItem('auth');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.logged = !!data.logged;
        this.role = data.role ?? null;
      } catch {}
    }

    // Garante usuário admin padrão
    const usuarios = this.getUsuarios();
    if (!usuarios.find(u => u.user === 'admin')) {
      usuarios.push({ user: 'admin', senha: '1234', role: 'admin' });
      this.saveUsuarios(usuarios);
    }
  }

  // === UTILITÁRIOS ===
  private getUsuarios(): Usuario[] {
    const raw = localStorage.getItem('usuarios');
    return raw ? JSON.parse(raw) : [];
  }

  private saveUsuarios(users: Usuario[]) {
    localStorage.setItem('usuarios', JSON.stringify(users));
  }

  // === LOGIN ===
  login(user: string, senha: string): Observable<{ ok: boolean; role: 'admin' | 'user' | null }> {
    return of({ user, senha }).pipe(
      delay(300),
      map(({ user, senha }) => {
        const usuarios = this.getUsuarios();
        const found = usuarios.find(u => u.user === user && u.senha === senha);

        const ok = !!found;
        const role = found ? found.role : null;

        if (ok) {
          this.logged = true;
          this.role = role;
          localStorage.setItem('auth', JSON.stringify({ logged: true, role }));
        } else {
          localStorage.removeItem('auth');
        }

        return { ok, role };
      })
    );
  }

  // === LOGOUT ===
  logout(): void {
    this.logged = false;
    this.role = null;
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  // === CRUD DE USUÁRIOS ===
  criarUsuario(user: string, senha: string, role: 'admin' | 'user'): boolean {
    const usuarios = this.getUsuarios();

    if (usuarios.find(u => u.user === user)) {
      return false;
    }

    usuarios.push({ user, senha, role });
    this.saveUsuarios(usuarios);
    return true;
  }

  listarUsuarios(): Usuario[] {
    return this.getUsuarios();
  }

  // === STATUS ===
  isLogged(): boolean {
    return this.logged;
  }

  getRole(): 'admin' | 'user' | null {
    return this.role;
  }
}
