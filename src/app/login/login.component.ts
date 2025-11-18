import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  email: string = '';
  senha: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  fazerLogin() {
    this.auth.login(this.email, this.senha)
      .then(() => {
        this.router.navigate(['/home']); // redireciona
      })
      .catch(err => {
        alert("Erro no login: " + err.message);
      });
  }
}
