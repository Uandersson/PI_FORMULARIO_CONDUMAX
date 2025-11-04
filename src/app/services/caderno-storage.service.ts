import { Injectable } from '@angular/core';

// Definimos a interface aqui para ser usada por ambos os serviços e componentes.
// No futuro, isso pode ir para um arquivo 'models.ts'
export interface Maquina {
  maquinas: string;
  mesAno: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class CadernoStorageService {
  private readonly STORAGE_KEY = 'cadernosSalvos';

  constructor() { }

  // Busca os cadernos salvos do localStorage
  getCadernosSalvos(): Maquina[] {
    // Adiciona uma verificação para garantir que o 'localStorage' existe
    if (typeof localStorage === 'undefined') {
      console.warn('localStorage não está disponível.');
      return [];
    }
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Erro ao ler cadernos salvos do localStorage:", e);
      return [];
    }
  }

  // Simula o salvamento de um caderno (adiciona à lista no localStorage)
  salvarCaderno(cadernoData: Maquina): void {
    if (typeof localStorage === 'undefined') {
      console.warn('localStorage não está disponível. Salvamento simulado falhou.');
      return;
    }
    
    const salvos = this.getCadernosSalvos();
    // Evita duplicados (baseado no ID)
    if (!salvos.some(c => c.id === cadernoData.id)) {
      salvos.push(cadernoData);
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(salvos));
        console.log('Caderno (simulado) salvo no storage:', cadernoData);
      } catch (e) {
        console.error("Erro ao salvar cadernos no localStorage:", e);
      }
    } else {
      console.warn('Caderno já existe no storage (simulado). Não foi adicionado novamente.');
      // Aqui você poderia implementar a lógica de ATUALIZAR um caderno existente, se quisesse
    }
  }

  // Função para limpar os dados salvos (para testes)
  limparCadernosSalvos(): void {
    if (typeof localStorage === 'undefined') { return; }
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('Cadernos salvos (simulados) limpos do storage.');
  }
}

