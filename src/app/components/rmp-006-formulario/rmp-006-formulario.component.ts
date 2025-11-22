import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-process-monitoring-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './rmp-006-formulario.component.html',
  styleUrls: ['./rmp-006-formulario.component.css']
})
export class ProcessMonitoringFormComponent implements OnInit, OnDestroy {
removeImage(arg0: string,_t186: HTMLInputElement) {
throw new Error('Method not implemented.');
}

  formConfig: any = {
    header: {
      title: 'REGISTRO DE MONITORAMENTO DO PROCESSO',
      subtitle: 'EXTRUSÃO – COMERCIAL',
      code: 'RMP-006',
      revision: 'Revisão – 009',
      date: 'Data: 28/03/2025'
    },
    generalInfo: {
      title: 'Informações gerais',
      rows: [
        [
          { label: 'Cód. do produto:', model: 'codProduto', style: 'width: 60%;' },
          { label: 'Nº lote:', model: 'lote', style: 'width: 20%;' },
          { label: 'Data:', model: 'data', style: 'width: 20%;' }
        ],
        [
          { label: 'Nº Matrícula OP início produção:', model: 'opInicio' },
          { label: 'Nº turno:', model: 'numTurno' },
          { label: 'Turno:', model: 'turno' }
        ],
        [
          { label: 'Nº Matrícula OP fim produção:', model: 'opFim' },
          { label: 'Hora de início:', model: 'horaInicio' },
          { label: 'Qtd. Produzida:', model: 'qtdProduzida' }
        ],
        [
          { label: 'Equipamentos de Medição utilizados na liberação do lote produzido. (Exp. Microohmimetro, Paquimetro, Spark Test, Micrometro)', model: 'equipamentos', colspan: 2, rowspan: 2 },
          { label: 'Hora do término:', model: 'horaTermino' }
        ],
        [
          {} 
        ]
      ]
    },
    rawMaterials: {
      title: 'Informações das matérias primas',
      headers: ['Item', 'Lote da matéria prima', '%', 'Lote da trancagem:', 'Lote da bobina:', 'Lote da bobina:', 'Lote da bobina:'],
      rows: 7
    },
    processChecklist: {
      title: 'Informações e Check-list de Processo (Plano de Controle e Instruções de Processo)',
      items: [
        { left: { label: 'Equipamento de medição', model: 'equipMedicao' }, right: { label: 'Cobertura/oxidação', model: 'coberturaOxi' } },
        { left: { label: 'Sentido de torção', model: 'sentidoTorcao' }, right: { label: 'Limpeza do secador', model: 'limpezaSecador' } },
      ],
      verificationSection: {
        title: 'Verificação dos condutores isolados/cobertos (processo)',
        items: [
          { type: 'input', label: 'Cor', model: 'cor' },
          { type: 'input', label: 'Formação da corda e QTD dos fios (passo)', model: 'formacaoCorda' },
          { type: 'input', label: 'Quantidade de Coroço:', model: 'qtdCoroco' },
          { type: 'input', label: 'Quantidade ou presença de asperezas ao longo do cabo, se apresentar:', model: 'asperezas' },
          { type: 'input', label: 'Nº de falhas de spark test:', model: 'sparkTest' },
          { type: 'input', label: 'Ensaio de dificuldade de condutor (OK / NOK):', model: 'dificuldadeCondutor' },
        ]
      },
      testsSection: {
        title: 'Registrar Valores encontrados',
        headers: ['Início', 'Fim'],
        items: [
          { label: '<strong>Resistência Elétrica:</strong> (para cabos até 6,00mm²)', model: 'resistenciaEletrica' },
          { label: '<strong>Cabos a tubo:</strong> Decapar 30cm e puxar a capa<br>A mesma não deve sair (OK / NOK)', model: 'cabosTubo' },
          { label: '<strong>Teste de torção nas veias dos cabos</strong><br>Maxlink G-Flex (OK / NOK)', model: 'testeTorcao' },
          { label: '<strong>Teste de aderência na cobertura dos cabos múltiplos:</strong> decapar 15cm<br>a mesma deve sair sem dificuldade (OK /NOK)', model: 'testeAderencia' }
        ]
      }
    },
    insulationQuality: {
      title: 'Informações de qualidade para isolação, capa ou cobertura. Colocar os valores de isolamento/cobertura',
      labels: ['Registrar valores encontrados Início:', 'Registrar os valores encontrados Final:'],
      dimensional: {
        layer: 'Isolamento',
        metrics: [
          { label: '% Concentricidade:', model: 'concentricidade' },
          { label: 'Espessura média:', model: 'espessuraMedia' },
          { label: 'Ponto mínimo:', model: 'pontoMinimo' },
        ]
      }
    },
    tools: {
      title: 'FERRAMENTAS',
      headers: ['Blco', 'Matriz', 'Cabeçote'],
      cleaning: {
        title: 'Fez Limpeza da Extrusora?',
        options: [
          { label: 'Tela', model: 'limpezaTela' },
          { label: 'Rosca', model: 'limpezaRosca' },
          { label: 'Geral', model: 'limpezaGeral' },
          { label: 'Não fez', model: 'naoFeita' },
        ]
      },
      report: { label: 'Gerar RNC / NP:', model: 'rnc' },
      result: { label: 'Resultado do Laudo:', model: 'laudo' }
    },
    footer: {
      author: 'Elaborado: Sílvio R. Nalini',
      approver: 'Aprovado: Hildo Sena',
      attention: 'ATENÇÃO: Em caso de divergência entre documentos prevalece o especificado na OP'
    }
  };

  isReadOnly: boolean = false;
  pages: any[] = []; 
  currentPageIndex: number = 0; 
  private readonly storageKey: string = 'formState_'; 
  private formId: string | null = null; 

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isReadOnly = this.route.snapshot.data['isReadOnly'] || false;
    this.formId = this.route.snapshot.paramMap.get('id') || 'novo';
    this.loadStateFromStorage();
  }

  ngOnDestroy(): void {
    if (!this.isReadOnly) this.saveStateToStorage();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (!this.isReadOnly) this.saveStateToStorage();
  }

  private createBlankPage(): any {
    return {
      codProduto: '', lote: '', data: '', opInicio: '', numTurno: '', turno: '',
      opFim: '', horaInicio: '', qtdProduzida: '', equipamentos: '', horaTermino: '',
      equipMedicao: { ok: false, nok: false }, coberturaOxi: { ok: false, nok: false },
      sentidoTorcao: { ok: false, nok: false }, limpezaSecador: { ok: false, nok: false },
      cor: '', formacaoCorda: '', qtdCoroco: '', asperezas: '', sparkTest: '', dificuldadeCondutor: '',
      resistenciaEletrica_inicio: '', resistenciaEletrica_fim: '',
      cabosTubo_inicio: '', cabosTubo_fim: '',
      testeTorcao_inicio: '', testeTorcao_fim: '',
      testeAderencia_inicio: '', testeAderencia_fim: '',
      concentricidade: '', espessuraMedia: '', pontoMinimo: '',
      
      resistenciaEletrica_inicio_img: null,
      resistenciaEletrica_fim_img: null,

      tool_Blco: '', tool_Matriz: '', tool_Cabeçote: '',
      limpezaTela: false, limpezaRosca: false, limpezaGeral: false, naoFeita: false,
      rnc: '',
      laudo: { aprovado: false, reprovado: false },
    };
  }

  addPage(): void {
    if (this.isReadOnly) return;
    this.pages.push(this.createBlankPage());
    this.goToPage(this.pages.length - 1);
  }

  goToPage(index: number): void {
    if (index >= 0 && index < this.pages.length) {
      this.currentPageIndex = index;
    }
  }

  nextPage(): void {
    if (this.currentPageIndex < this.pages.length - 1) {
      this.currentPageIndex++;
    }
  }

  previousPage(): void {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }

  private loadStateFromStorage(): void {
    const savedState = localStorage.getItem(this.storageKey + this.formId);
    if (savedState) {
      this.pages = JSON.parse(savedState);
      this.currentPageIndex = Math.min(this.currentPageIndex, this.pages.length - 1);
      if (this.currentPageIndex < 0) this.currentPageIndex = 0;
    } else {
      this.pages = Array.from({ length: 10 }, () => this.createBlankPage());
      this.currentPageIndex = 0;
    }
  }

  private saveStateToStorage(): void {
    if (this.isReadOnly) return;
    localStorage.setItem(this.storageKey + this.formId, JSON.stringify(this.pages));
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  submitAndClear(): void {
    if (this.isReadOnly) return;
    this.saveStateToStorage();
    localStorage.removeItem(this.storageKey + this.formId);
    this.router.navigate(['/home']);
  }

  toggleCheckbox(model: any, type: string): void {
    if (this.isReadOnly) return;
    const currentPageData = this.pages[this.currentPageIndex];
    const targetModel = currentPageData[model];

    if (targetModel && targetModel[type]) {
      const otherType = type === 'ok' ? 'nok' : (type === 'nok' ? 'ok' : (type === 'aprovado' ? 'reprovado' : 'aprovado'));
      if (otherType in targetModel) targetModel[otherType] = false;
    } else if (targetModel && typeof targetModel === 'object') {
      if (targetModel[type]) {
        const otherType = type === 'ok' ? 'nok' : (type === 'nok' ? 'ok' : (type === 'aprovado' ? 'reprovado' : 'aprovado'));
        if (otherType in targetModel) targetModel[otherType] = false;
      }
    }
  }

  toggleCleaningCheckbox(selectedModelKey: string): void {
    if (this.isReadOnly) return;
    const currentPageData = this.pages[this.currentPageIndex];
    this.formConfig.tools.cleaning.options.forEach((option: any) => {
      if (option.model !== selectedModelKey) {
        currentPageData[option.model] = false;
      }
    });
  }

  removeCurrentPage(): void {
    if (this.isReadOnly) return;
    if (this.pages.length <= 1) return;
    this.pages.splice(this.currentPageIndex, 1);
    if (this.currentPageIndex >= this.pages.length) this.currentPageIndex = this.pages.length - 1;
  }

  uploadImage(event: any, fieldName: string) {
    if (this.isReadOnly) return;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pages[this.currentPageIndex][fieldName] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // --- SOLUÇÃO DE IMPRESSÃO (Substituição de Inputs por Texto) ---
  public downloadPDF(): void {
    const data = document.getElementById('conteudo-para-impressao');

    if (data) {
      // 1. Clona o nó para não estragar a tela do usuário
      const clone = data.cloneNode(true) as HTMLElement;
      
      // Cria um container temporário fora da tela
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.appendChild(clone);
      document.body.appendChild(container);

      // 2. Transforma INPUTS em SPANS (Texto Puro)
      // Isso força o html2canvas a renderizar texto, resolvendo o problema dos pontinhos
      const inputs = clone.querySelectorAll('input');
      const textareas = clone.querySelectorAll('textarea');
      const selects = clone.querySelectorAll('select');

      // (A) Processa INPUTS
      inputs.forEach((input: HTMLInputElement) => {
         if (input.type === 'checkbox' || input.type === 'radio') {
             // Mantém checkboxes, mas força o estado checked
             if (input.checked) input.setAttribute('checked', 'checked');
             else input.removeAttribute('checked');
         } else if (input.type === 'file') {
             // Esconde input file no PDF
             input.style.display = 'none';
         } else {
             // Cria um SPAN para substituir o input de texto
             const span = document.createElement('span');
             span.innerText = input.value; // Pega o valor digitado
             span.style.display = 'inline-block';
             span.style.width = '100%';
             span.style.minHeight = '18px';
             span.style.borderBottom = '1px dotted #000'; // Desenha a linha pontilhada manualmente
             span.style.fontFamily = 'inherit';
             span.style.fontSize = 'inherit';
             span.style.padding = '2px 0';
             
             // Substitui o input pelo span no clone
             if(input.parentNode) {
                 input.parentNode.replaceChild(span, input);
             }
         }
      });

      // (B) Processa TEXTAREAS
      textareas.forEach((area: HTMLTextAreaElement) => {
         const div = document.createElement('div');
         div.innerText = area.value;
         div.style.width = '100%';
         div.style.fontFamily = 'inherit';
         div.style.fontSize = 'inherit';
         div.style.whiteSpace = 'pre-wrap'; // Mantém quebra de linha
         if(area.parentNode) {
             area.parentNode.replaceChild(div, area);
         }
      });

      // (C) Processa SELECTS
      selects.forEach((select: HTMLSelectElement) => {
         const span = document.createElement('span');
         span.innerText = select.options[select.selectedIndex]?.text || '';
         if(select.parentNode) {
             select.parentNode.replaceChild(span, select);
         }
      });

      // 3. Remove sombra para captura limpa
      const originalShadow = clone.style.boxShadow;
      clone.style.boxShadow = 'none';
      
      // 4. Gera o PDF a partir do CLONE (não da tela original)
      html2canvas(clone, {
        scale: 3, 
        useCORS: true, 
        logging: false, 
        backgroundColor: '#ffffff',
        width: clone.offsetWidth,
        height: clone.offsetHeight
      }).then(canvas => {
        // Remove o clone da memória/tela
        document.body.removeChild(container);

        const contentDataURL = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = 210;
        const pdfHeight = 297;
        const marginX = 10;
        const marginY = 10;
        
        const printWidth = pdfWidth - (2 * marginX);
        const printHeight = pdfHeight - (2 * marginY);

        const imgProps = pdf.getImageProperties(contentDataURL);
        const ratio = Math.min(printWidth / imgProps.width, printHeight / imgProps.height);
        
        const finalWidth = imgProps.width * ratio;
        const finalHeight = imgProps.height * ratio;

        const xOffset = (pdfWidth - finalWidth) / 2;
        const yOffset = (pdfHeight - finalHeight) / 2;

        pdf.addImage(contentDataURL, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
        pdf.save(`RMP-006_Folha_${this.currentPageIndex + 1}.pdf`);
      });
    } else {
      console.error('Elemento não encontrado!');
    }
  }
}