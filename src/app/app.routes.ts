import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

// ==========================================================
// ===== CORREÇÃO AQUI =====
// ==========================================================

// 1. IMPORTAMOS OS DOIS FORMULÁRIOS

// O NOVO formulário (RMP-009 Tabela)


// O ANTIGO formulário (da Extrusora)
import { ProcessMonitoringFormComponent } from './components/rmp-006-formulario/rmp-006-formulario.component';
import { ProcessMonitoringComponent } from './components/rmp-009-formulario/rmp-009-formulario.component';


export const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full' },
 { path: 'login', component: LoginComponent },
 { path: 'cadastro', component: CadastroComponent },
 { path: 'home', component: HomeComponent },
 { path: 'admin', component: AdminComponent },

 // --- ROTAS DO NOVO FORMULÁRIO (RMP-009) ---
  // O botão "RMP-009" na home aponta para '/caderno/novo'
 { 
    path: 'caderno/novo', 
    component: ProcessMonitoringComponent // <--- Carrega o NOVO
  },
 
 // --- ROTAS DO FORMULÁRIO ANTIGO (EXTRUSORA) ---
  // O botão "Acessar Caderno" da Extrusora aponta para '/caderno/editar/:id'
 { 
    path: 'caderno/editar/:id', 
    component: ProcessMonitoringFormComponent, // <--- Carrega o ANTIGO
    data: { isReadOnly: false } 
  },
 { 
    path: 'caderno/ver/:id', 
    component: ProcessMonitoringFormComponent, // <--- Carrega o ANTIGO
    data: { isReadOnly: true } 
  },

  // ==========================================================
  // ===== FIM DA CORREÇÃO =====
  // ==========================================================

 { path: '**', redirectTo: 'login' },
];