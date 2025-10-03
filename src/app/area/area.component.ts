import { Component } from '@angular/core';

@Component({
  selector: 'app-area',
  standalone: true,
  template: `
    <div class="area-wrapper">
      <h1>Bem-vindo(a) à Condumax!</h1>
      <p>Login efetuado com sucesso.</p>
      <a routerLink="/login">Sair</a>
    </div>
  `,
  styles: [`
    .area-wrapper{
      min-height:100vh; display:grid; place-items:center;
      color:#fff; text-align:center; gap:10px;
      background:#0b0e12;
    }
    a{ color:#7cc8ff }
  `]
})
export class AreaComponent {}
