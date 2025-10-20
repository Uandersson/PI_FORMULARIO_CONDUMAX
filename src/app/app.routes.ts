import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ProcessMonitoringFormComponent } from './components/process-monitoring-form/process-monitoring-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },

  // --- ROTAS DO FORMULÁRIO ATUALIZADAS ---
  // Modo de Criação: Formulário editável
  { path: 'caderno/novo', component: ProcessMonitoringFormComponent, data: { isReadOnly: false } },

  // Modo de Edição: Formulário editável
  { path: 'caderno/editar/:id', component: ProcessMonitoringFormComponent, data: { isReadOnly: false } },
  
  // MODO DE VISUALIZAÇÃO: Formulário bloqueado (somente leitura)
  { path: 'caderno/ver/:id', component: ProcessMonitoringFormComponent, data: { isReadOnly: true } },

  { path: '**', redirectTo: 'login' },
];