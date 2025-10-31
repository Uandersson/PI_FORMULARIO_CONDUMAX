import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface Usuario {
  id?: number;
  user: string;
  senha: string;
  role: 'admin' | 'user';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://seuapp-production.up.railway.app'; // ✅ troque pela URL do seu backend no Railway
  private logged = false;
  private role: 'admin' | 'user' | null = null;

  constructor(private http: HttpClient, private router: Router) {
    const saved = localStorage.getItem('auth');
    if (saved) {
      const data = JSON.parse(saved);
      this.logged = !!data.logged;
      this.role = data.role ?? null;
    }
  }

  // === LOGIN ===
  login(user: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { user, senha }).pipe(
      tap((res: any) => {
        if (res.ok) {
          this.logged = true;
          this.role = res.role;
          localStorage.setItem('auth', JSON.stringify({ logged: true, role: res.role }));
        }
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

  // === CRUD USUÁRIOS ===
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  criarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
  }

  atualizarUsuario(id: number, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  excluirUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }

  // === STATUS ===
  isLogged(): boolean {
    return this.logged;
  }

  getRole(): 'admin' | 'user' | null {
    return this.role;
  }
}
