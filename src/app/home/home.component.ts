import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface para uma máquina individual
interface Maquina {
  maquinas: string; // Nome específico da máquina
  mesAno: string;
  id: number;
}

// Interface para uma Pasta/Categoria
interface PastaMaquinas {
  nome: string; // Nome da pasta (Ex: "Extrusoras")
  maquinas: Maquina[]; // Lista de máquinas dentro desta pasta
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchTerm: string = '';

  // --- ESTRUTURA DE DADOS COM PASTAS ---
  pastas: PastaMaquinas[] = [
    {
      nome: 'Extrusoras',
      maquinas: [
        { maquinas: 'EXTRUSORA-04-002 EB', mesAno: '03/2025', id: 7 },
        { maquinas: 'EXTRUSORA-04-029 EA', mesAno: '03/2025', id: 5 },
      ]
    },
    // Adicione mais pastas conforme necessário
  ];

  // --- CONTROLE DE EXIBIÇÃO ---
  pastaSelecionada: PastaMaquinas | null = null; // Guarda a pasta clicada
  maquinaSelecionadaCapa: Maquina | null = null; // Guarda a máquina clicada para a "capa"

  constructor(private auth: AuthService, private router: Router) {}

  // --- LÓGICA DE FILTRAGEM E SELEÇÃO ---

  // Filtra as PASTAS visíveis
  get filteredPastas(): PastaMaquinas[] {
    if (!this.searchTerm) {
      return this.pastas;
    }
    const termo = this.searchTerm.toLowerCase();
    // Filtra pastas cujo nome contém o termo OU que contêm máquinas que contêm o termo
    return this.pastas.filter(p =>
      p.nome.toLowerCase().includes(termo) ||
      p.maquinas.some(m => m.maquinas.toLowerCase().includes(termo))
    );
  }

  // Retorna as máquinas da pasta selecionada (usado na tabela) E APLICA O FILTRO DE BUSCA
  get maquinasDaPastaSelecionada(): Maquina[] {
    const maquinas = this.pastaSelecionada?.maquinas || [];
    if (!this.searchTerm) {
        return maquinas; // Retorna todas se não houver busca
    }
    const termo = this.searchTerm.toLowerCase();
    // Filtra as máquinas DENTRO da pasta selecionada
    return maquinas.filter(m =>
        m.maquinas.toLowerCase().includes(termo) ||
        m.mesAno.toLowerCase().includes(termo) // Assume que a busca também pode ser por Mês/Ano
    );
  }


  // Chamado ao clicar em uma pasta
  selecionarPasta(pasta: PastaMaquinas): void {
    this.pastaSelecionada = pasta;
    this.searchTerm = ''; // Limpa a busca ao entrar numa pasta
  }

  // Chamado para voltar à lista de pastas
  voltarParaPastas(): void {
    this.pastaSelecionada = null;
    this.maquinaSelecionadaCapa = null; // Garante que a capa da máquina feche também
    this.searchTerm = '';
  }

  // Chamado ao clicar em "Ver Detalhes" ou "Editar Caderno" na lista de MÁQUINAS
  selecionarMaquinaParaCapa(maquina: Maquina): void {
    this.maquinaSelecionadaCapa = maquina;
  }

  // Chamado da "capa" para voltar à lista de MÁQUINAS da pasta atual
  voltarParaListaMaquinas(): void {
    this.maquinaSelecionadaCapa = null;
  }

  // --- FUNÇÕES DE NAVEGAÇÃO E AÇÕES (mantidas e ajustadas) ---

  search(): void {
    // A busca agora filtra pastas ou máquinas dependendo da visão atual
    console.log('Buscando por:', this.searchTerm);
    // A lógica de filtragem está nos getters `filteredPastas` e `maquinasDaPastaSelecionada`
  }

  goCadastrar(): void {
    this.router.navigate(['/caderno/novo']);
  }

  // Chamado da CAPA para ir ao formulário de VISUALIZAÇÃO
  /*verFormulario(): void {
    if (this.maquinaSelecionadaCapa) {
      this.router.navigate(['/caderno/ver', this.maquinaSelecionadaCapa.id]);
    }
  }*/

  // Chamado da CAPA para ir ao formulário de EDIÇÃO
  editarFormulario(): void {
    if (this.maquinaSelecionadaCapa) {
      this.router.navigate(['/caderno/editar', this.maquinaSelecionadaCapa.id]);
    }
  }

  sair(): void {
    this.auth.logout(); // Chama o serviço de autenticação
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}

