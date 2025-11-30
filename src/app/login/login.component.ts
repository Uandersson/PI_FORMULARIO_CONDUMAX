import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message: string = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  login(email: string, senha: string) {
    signInWithEmailAndPassword(this.auth, email, senha)
      .then(() => {
        this.router.navigate(['/home']);   // ⬅ redireciona após login
      })
      .catch(err => this.message = 'Erro: ' + err.message);
  }
}
