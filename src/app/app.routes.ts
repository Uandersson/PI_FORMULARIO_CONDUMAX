import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

import { ProcessMonitoringFormComponent } from './components/rmp-006-formulario/rmp-006-formulario.component';
import { ProcessMonitoringComponent } from './components/rmp-009-formulario/rmp-009-formulario.component';
import { CadastroComponent } from './cadastro/cadastro.component';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },

  // NOVO FORMULÁRIO RMP-009
  { 
    path: 'caderno/novo',
    component: ProcessMonitoringComponent
  },

  // FORMULÁRIO ANTIGO (RMP-006)
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

  // ROTA CORINGA
  { path: '**', redirectTo: 'login' },
];
