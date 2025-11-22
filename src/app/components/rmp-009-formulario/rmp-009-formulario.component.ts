import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// Interface para UMA LINHA da tabela
interface FormRow {
  item: number;
  codigo_produto: string;
  lote: string;
  aterramento_bobina: string; // 'sim' ou 'nao'
  realizacao_plano_controle: string;
  diametro_menor: string;
  diametro_maior: string;
  alongamento_inicio: string;
  alongamento_final: string;
  metro_inicio: boolean; // OK/NAO
  metro_final: boolean;
  oxidacao_inicio: boolean; // Aprovado/Reprovado
  oxidacao_final: boolean;
  quantidade_produzida: string;
  gravacao_inicio: string;
  gravacao_final: string;
  conferir_equipamentos: string; // OK ou S/OK
  n_falhas_spark: string;
  turno: string;
  registro_operador: string;
  data: string;
  laudo_ar: boolean; // A/R
}

@Component({
  selector: 'app-rmp009-form', // Mude este seletor se necessário
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './rmp-009-formulario.component.html',
  styleUrls: ['./rmp-009-formulario.component.css']
})
export class ProcessMonitoringComponent implements OnInit, OnDestroy {

  isReadOnly: boolean = false;
  pages: any[] = []; // Cada item do array é uma "Folha"
  currentPageIndex: number = 0;
  
  private readonly storageKey: string = 'rmp009_formState_';
  private formId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.isReadOnly = this.route.snapshot.data['isReadOnly'] || false;
    this.formId = this.route.snapshot.paramMap.get('id') || 'novo';
    this.loadStateFromStorage();
  }

  ngOnDestroy(): void {
    this.saveStateToStorage();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (!this.isReadOnly) {
      this.saveStateToStorage();
    }
  }

  // Cria uma "Folha" (página) em branco, que contém 20 linhas de itens
  private createBlankPage(): any {
    return {
      // Aqui poderiam entrar dados gerais da folha, se houverem
      // Por enquanto, apenas as 20 linhas
      items: Array.from({ length: 20 }, (_, i) => this.createBlankRow(i + 1))
    };
  }

  // Cria uma "Linha" em branco para a tabela
  private createBlankRow(itemNumber: number): FormRow {
    return {
      item: itemNumber,
      codigo_produto: '',
      lote: '',
      aterramento_bobina: 'nao',
      realizacao_plano_controle: '',
      diametro_menor: '',
      diametro_maior: '',
      alongamento_inicio: '',
      alongamento_final: '',
      metro_inicio: false,
      metro_final: false,
      oxidacao_inicio: false,
      oxidacao_final: false,
      quantidade_produzida: '',
      gravacao_inicio: '',
      gravacao_final: '',
      conferir_equipamentos: 'S/OK',
      n_falhas_spark: '',
      turno: '',
      registro_operador: '',
      data: '',
      laudo_ar: false
    };
  }

  // --- LÓGICA DE PAGINAÇÃO ---
  addPage(): void {
    if (this.isReadOnly) return;
    this.pages.push(this.createBlankPage());
    this.goToPage(this.pages.length - 1);
  }

  removePage(): void {
    if (this.isReadOnly || this.pages.length <= 1) return;
    if (confirm(`Tem certeza que deseja remover a Folha ${this.currentPageIndex + 1}?`)) {
      this.pages.splice(this.currentPageIndex, 1);
      if (this.currentPageIndex >= this.pages.length) {
        this.currentPageIndex = this.pages.length - 1;
      }
      this.saveStateToStorage(); // Salva após remover
    }
  }

  goToPage(index: number): void {
    if (index >= 0 && index < this.pages.length) {
      this.currentPageIndex = index;
    }
  }
  nextPage(): void { this.goToPage(this.currentPageIndex + 1); }
  previousPage(): void { this.goToPage(this.currentPageIndex - 1); }

  // --- LÓGICA DE PERSISTÊNCIA (AUTOSAVE) ---
  private loadStateFromStorage(): void {
    const savedState = localStorage.getItem(this.storageKey + this.formId);
    if (savedState) {
      this.pages = JSON.parse(savedState);
      this.currentPageIndex = 0;
    } else {
      // Se não houver estado salvo, cria 1 folha inicial com 20 linhas
      this.pages = [this.createBlankPage()];
      this.currentPageIndex = 0;
    }
  }

  private saveStateToStorage(): void {
    if (this.isReadOnly) return;
    localStorage.setItem(this.storageKey + this.formId, JSON.stringify(this.pages));
    console.log(`Estado do formulário RMP-009 '${this.formId}' salvo.`);
  }

  // --- AÇÕES FINAIS ---
  goBack(): void {
    this.router.navigate(['/home']);
  }
  
  submitAndClear(): void {
    if (this.isReadOnly) return;
    console.log("ENVIANDO DADOS FINAIS RMP-009:", this.pages);
    localStorage.removeItem(this.storageKey + this.formId);
    this.router.navigate(['/home']);
  }
}