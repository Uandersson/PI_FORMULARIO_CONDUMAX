import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'esqueci-senha', component: EsqueciSenhaComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'login' },
];
