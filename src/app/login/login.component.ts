import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false // <--- MUITO IMPORTANTE: Tem que ser false
})
export class LoginComponent {

  email: string = '';
  senha: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  fazerLogin() {
    this.auth.login(this.email, this.senha)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((err: any) => {
        alert("Erro no login: " + (err.message || "Erro desconhecido"));
      });
  }
}