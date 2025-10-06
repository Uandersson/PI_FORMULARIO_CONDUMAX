import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';

// 👇 Adiciona import do componente Admin
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Páginas principais
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent },

  // 👇 Nova rota de administrador
  { path: 'admin', component: AdminComponent },

  // Rota coringa
  { path: '**', redirectTo: 'login' },
];
