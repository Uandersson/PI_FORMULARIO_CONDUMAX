import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private logged = false;
  constructor(private router: Router) {}

  login(email: string, senha: string): Observable<boolean> {
    return of({ email, senha }).pipe(
      delay(600),
      map(({ email, senha }) => {
        const ok = !!email && !!senha;
        this.logged = ok;
        return ok;
      })
    );
  }

  requestPasswordReset(email: string): Observable<boolean> {
    return of(!!email).pipe(delay(600));
  }

  logout(): void { this.logged = false; this.router.navigate(['/login']); }
  isLogged(): boolean { return this.logged; }
}
