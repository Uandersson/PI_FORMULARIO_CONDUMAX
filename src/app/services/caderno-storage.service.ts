    import { Injectable } from '@angular/core';

    // Usaremos a mesma interface Maquina da Home por simplicidade
    // (Considere mover esta interface para um arquivo compartilhado 'models.ts' no futuro)
    interface Maquina {
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
        if (typeof localStorage === 'undefined') { // Proteção para SSR ou ambientes sem localStorage
             return [];
        }
        const data = localStorage.getItem(this.STORAGE_KEY);
        try {
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Erro ao parsear cadernos salvos do localStorage:", e);
            return []; // Retorna array vazio em caso de erro
        }
      }

      // Simula o salvamento de um caderno (apenas adiciona à lista no localStorage)
      salvarCaderno(cadernoData: Maquina): void {
         if (typeof localStorage === 'undefined') { return; } // Proteção

        const salvos = this.getCadernosSalvos();
        // Evita duplicados (baseado no ID, que deve ser único)
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
            // Poderia atualizar em vez de adicionar, se fosse o caso
        }
      }

       // Função para limpar os dados salvos (para testes)
       limparCadernosSalvos(): void {
           if (typeof localStorage === 'undefined') { return; } // Proteção
           localStorage.removeItem(this.STORAGE_KEY);
           console.log('Cadernos salvos (simulados) limpos do storage.');
       }
    }
    

