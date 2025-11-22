import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface para uma máquina individual
interface Maquina {
 maquinas: string; // Nome específico da máquina
 mesAno: string;
 id: number; // ID usado pelo formulário antigo
}

// ==========================================================
// ===== MUDANÇA 1: ATUALIZAMOS A INTERFACE DAS PASTAS =====
// Adicionamos 'formType' para saber qual formulário abrir
// ==========================================================
interface PastaMaquinas {
 nome: string; // Nome da pasta (Ex: "Extrusoras")
 maquinas: Maquina[]; // Lista de máquinas dentro desta pasta
  formType: 'antigo' | 'rmp009'; // 'antigo' (Extrusora) ou 'rmp009' (o novo)
}

@Component({
 selector: 'app-home',
 standalone: true,
 imports: [CommonModule, FormsModule, RouterLink],
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // A função irParaRMP009() foi REMOVIDA, pois não é mais necessária

 searchTerm: string = '';

 // ==========================================================
  // ===== MUDANÇA 2: ATUALIZAMOS A LISTA DE PASTAS =====
  // Adicionamos "RMP-009" como uma pasta e "Medição 11-004" dentro dela
  // ==========================================================
 pastas: PastaMaquinas[] = [

  { nome: 'Extrusoras',
  formType: 'antigo', // <-- Define o tipo de formulário
  maquinas: [
 { maquinas: 'EXTRUSORA-04-002 EB', mesAno: '03/2025', id: 0 },
 { maquinas: 'EXTRUSORA-04-029 EA', mesAno: '03/2025', id: 1 },
 { maquinas: 'EXTRUSORA-04-030 EU', mesAno: '03/2025', id: 2 },
 ]
 },
    {
      nome: 'Medição', // <-- Sua nova pasta
      formType: 'rmp009', // <-- Define o tipo de formulário
      maquinas: [
        // Adicionamos o item que você pediu.
        // O ID 0 é simbólico, já que o form RMP-009 não usa ID.
        { maquinas: 'Medição 11-004', mesAno: '11/2025', id: 0 },
        { maquinas: 'Medição 11-041', mesAno: '11/2025', id: 1 }, 
        { maquinas: 'Medição 11-045', mesAno: '11/2025', id: 2 }, 
        { maquinas: 'Medição 11-015', mesAno: '11/2025', id: 3 }, 
        { maquinas: 'Medição 11-014', mesAno: '11/2025', id: 4 } 
      ]
    }
 ];

 // --- CONTROLE DE EXIBIÇÃO ---
pastaSelecionada: PastaMaquinas | null = null; 
maquinaSelecionadaCapa: Maquina | null = null; 

 constructor(private auth: AuthService, private router: Router) {}

 // --- LÓGICA DE FILTRAGEM E SELEÇÃO (Sem alterações) ---

 get filteredPastas(): PastaMaquinas[] {
 if (!this.searchTerm) {
 return this.pastas;
 }
 const termo = this.searchTerm.toLowerCase();
 return this.pastas.filter(p =>
 p.nome.toLowerCase().includes(termo) ||
 p.maquinas.some(m => m.maquinas.toLowerCase().includes(termo))
 );
 }

 get maquinasDaPastaSelecionada(): Maquina[] {
 const maquinas = this.pastaSelecionada?.maquinas || [];
 if (!this.searchTerm) {
 return maquinas;
 }
 const termo = this.searchTerm.toLowerCase();
 return maquinas.filter(m =>
 m.maquinas.toLowerCase().includes(termo) ||
 m.mesAno.toLowerCase().includes(termo)
 );
 }

 selecionarPasta(pasta: PastaMaquinas): void {
 this.pastaSelecionada = pasta;
 this.searchTerm = ''; 
 }

 voltarParaPastas(): void {
 this.pastaSelecionada = null;
 this.maquinaSelecionadaCapa = null;
 this.searchTerm = '';
 }

 selecionarMaquinaParaCapa(maquina: Maquina): void {
 this.maquinaSelecionadaCapa = maquina;
 }

 voltarParaListaMaquinas(): void {
 this.maquinaSelecionadaCapa = null;
 }

// --- FUNÇÕES DE NAVEGAÇÃO E AÇÕES ---

 search(): void {
 console.log('Buscando por:', this.searchTerm);
 }

 goCadastrar(): void {
    // Esta rota pode ser usada para "Cadernos Novos" genéricos
 this.router.navigate(['/cadastro']); // Mantivemos a rota 'cadastro'
 }

 // ==========================================================
  // ===== MUDANÇA 3: ATUALIZAMOS A LÓGICA DE EDIÇÃO =====
  // Esta função agora decide qual formulário abrir
  // ==========================================================
 editarFormulario(): void {
 if (this.maquinaSelecionadaCapa && this.pastaSelecionada) {
      
      // Se a pasta for do tipo 'rmp009', vamos para o formulário NOVO
      if (this.pastaSelecionada.formType === 'rmp009') {
        // A rota '/caderno/novo' carrega o ProcessMonitoringComponent (o novo)
        this.router.navigate(['/caderno/novo']);
      
      } else {
        // Senão, vamos para o formulário ANTIGO (Extrusora)
        // A rota '/caderno/editar/:id' carrega o ProcessMonitoringFormComponent (o antigo)
        this.router.navigate(['/caderno/editar', this.maquinaSelecionadaCapa.id]);
      }
 }
 }

 sair(): void {
 this.auth.logout(); 
 this.router.navigate(['/login']); 
}
}