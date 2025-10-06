// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

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
      } catch { /* ignore parse error */ }
    }
  }

  // Retorna { ok, role } sempre (nunca undefined)
  login(user: string, senha: string): Observable<{ ok: boolean; role: 'admin' | 'user' | null }> {
    return of({ user, senha }).pipe(
      delay(400),
      map(({ user, senha }) => {
        let ok = false;
        let role: 'admin' | 'user' | null = null;

        if (user === 'admin' && senha === '1234') {
          ok = true;
          role = 'admin';
        } else if (user && senha) {
          ok = true;
          role = 'user';
        }

        this.logged = ok;
        this.role = role;

        if (ok) {
          localStorage.setItem('auth', JSON.stringify({ logged: true, role }));
        } else {
          localStorage.removeItem('auth');
        }

        return { ok, role };
      })
    );
  }

  logout(): void {
    this.logged = false;
    this.role = null;
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  isLogged(): boolean { return this.logged; }
  getRole(): 'admin' | 'user' | null { return this.role; }
}
