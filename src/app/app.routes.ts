import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { CadastroComponent } from './cadastro/cadastro.component';

import { ProcessMonitoringFormComponent } from './components/rmp-006-formulario/rmp-006-formulario.component';
import { ProcessMonitoringComponent } from './components/rmp-009-formulario/rmp-009-formulario.component';

export const routes: Routes = [

  // Página inicial → login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Telas principais
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'cadastro', component: CadastroComponent },

  // Formulário novo (RMP-009)
  { 
    path: 'caderno/novo',
    component: ProcessMonitoringComponent
  },

  // Formulário antigo (RMP-006)
  { 
    path: 'caderno/editar/:id',
    component: ProcessMonitoringFormComponent,
    data: { isReadOnly: false }
  },

  { 
    path: 'caderno/ver/:id',
    component: ProcessMonitoringFormComponent,
    data: { isReadOnly: true }
  },

  // Qualquer rota inválida → volta ao login
  { path: '**', redirectTo: 'login' },
];
