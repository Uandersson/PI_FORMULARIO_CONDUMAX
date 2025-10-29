import { Component, OnInit, OnDestroy, HostListener } from '@angular/core'; // Adicionado OnInit, OnDestroy, HostListener
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Adicionado ActivatedRoute, Router

@Component({
  selector: 'app-process-monitoring-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './process-monitoring-form.component.html',
  styleUrls: ['./process-monitoring-form.component.css']
})
// Implementa OnInit e OnDestroy para controle do ciclo de vida
export class ProcessMonitoringFormComponent implements OnInit, OnDestroy {

  // --- Propriedades Existentes ---
  formConfig: any = { // Mantido como estava
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
          {} // Célula vazia para compensar o rowspan
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

  // --- Propriedades Adicionadas ---
  isReadOnly: boolean = false; // Controla o modo leitura/edição
  pages: any[] = []; // Array que guardará os dados de cada folha
  currentPageIndex: number = 0; // Índice da folha atual
  private readonly storageKey: string = 'formState_'; // Chave para o localStorage
  private formId: string | null = null; // ID do formulário (da rota ou 'novo')

  // Injeta ActivatedRoute e Router
  constructor(private route: ActivatedRoute, private router: Router) {}

  // --- Métodos do Ciclo de Vida (Adicionados) ---
  ngOnInit(): void {
    this.isReadOnly = this.route.snapshot.data['isReadOnly'] || false;
    this.formId = this.route.snapshot.paramMap.get('id') || 'novo';
    this.loadStateFromStorage(); // Carrega dados salvos ou cria folhas novas
  }

  ngOnDestroy(): void {
    if (!this.isReadOnly) { // Só salva se não estiver em modo leitura
      this.saveStateToStorage();
    }
  }

  // Salva ao fechar/recarregar a página
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (!this.isReadOnly) {
      this.saveStateToStorage();
    }
  }

  // --- Função para Criar Folha em Branco (Baseado no seu formData original) ---
  private createBlankPage(): any {
    // Retorna a estrutura de uma folha vazia, usando a estrutura do seu formData
    return {
      // Info Gerais (baseado nos 'model' do formConfig.generalInfo.rows)
      codProduto: '', lote: '', data: '', opInicio: '', numTurno: '', turno: '',
      opFim: '', horaInicio: '', qtdProduzida: '', equipamentos: '', horaTermino: '',

      // Materiais (sem dados aqui, pois não estavam ligados ao formData)

      // Checklist (baseado nos 'model' do formConfig.processChecklist.items)
      equipMedicao: { ok: false, nok: false }, coberturaOxi: { ok: false, nok: false },
      sentidoTorcao: { ok: false, nok: false }, limpezaSecador: { ok: false, nok: false },

      // Verificação (baseado nos 'model' do formConfig.processChecklist.verificationSection.items)
      cor: '', formacaoCorda: '', qtdCoroco: '', asperezas: '', sparkTest: '', dificuldadeCondutor: '',

      // Testes (baseado nos 'model' do formConfig.processChecklist.testsSection.items)
      resistenciaEletrica_inicio: '', resistenciaEletrica_fim: '',
      cabosTubo_inicio: '', cabosTubo_fim: '',
      testeTorcao_inicio: '', testeTorcao_fim: '',
      testeAderencia_inicio: '', testeAderencia_fim: '',

      // Qualidade Isolação (baseado nos 'model' do formConfig.insulationQuality.dimensional.metrics)
      concentricidade: '', espessuraMedia: '', pontoMinimo: '',

      // Ferramentas (baseado nos 'model' do formConfig.tools)
      tool_Blco: '', tool_Matriz: '', tool_Cabeçote: '',
      limpezaTela: false, limpezaRosca: false, limpezaGeral: false, naoFeita: false,
      rnc: '',
      laudo: { aprovado: false, reprovado: false },
    };
  }

  // --- Métodos de Paginação (Adicionados) ---
  addPage(): void {
    if (this.isReadOnly) return;
    this.pages.push(this.createBlankPage());
    this.goToPage(this.pages.length - 1); // Vai para a nova página
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

  // --- Métodos de Persistência (Adicionados) ---
  private loadStateFromStorage(): void {
    const savedState = localStorage.getItem(this.storageKey + this.formId);
    if (savedState) {
      this.pages = JSON.parse(savedState);
      // Garante que o índice não seja inválido se as páginas salvas forem menos que as atuais
      this.currentPageIndex = Math.min(this.currentPageIndex, this.pages.length - 1);
      if (this.currentPageIndex < 0) this.currentPageIndex = 0; // Garante que não seja negativo
      console.log(`Estado do formulário '${this.formId}' restaurado do localStorage.`);
    } else {
      // Se não houver estado salvo, cria as 10 folhas iniciais
      this.pages = Array.from({ length: 10 }, () => this.createBlankPage());
      this.currentPageIndex = 0;
      console.log('Novo formulário com 10 folhas em branco criado.');
    }
  }

  private saveStateToStorage(): void {
    if (this.isReadOnly) return; // Nunca salva se estiver em modo de visualização
    localStorage.setItem(this.storageKey + this.formId, JSON.stringify(this.pages));
    console.log(`Estado do formulário '${this.formId}' salvo no localStorage.`);
  }

  // --- Métodos de Ação (Adicionados/Modificados) ---
  goBack(): void {
    // Idealmente, perguntar se quer salvar antes de sair, mas por ora, só navega
    this.router.navigate(['/home']); // Navega para a home (ajuste se a rota for outra)
  }

  // Salva uma última vez, limpa o estado do localStorage e navega
  submitAndClear(): void {
    if (this.isReadOnly) return;

    // 1. Salva o estado atual uma última vez
    this.saveStateToStorage();

    // 2. Aqui virá a lógica para enviar os dados para a API (backend)
    console.log("ENVIANDO DADOS FINAIS PARA O BACKEND:", this.pages);

    // 3. Limpa o estado salvo no navegador após o envio bem-sucedido
    localStorage.removeItem(this.storageKey + this.formId);
    console.log(`Estado do formulário '${this.formId}' removido do localStorage.`);

    // 4. Navega de volta para a home
    this.router.navigate(['/home']); // Ajuste a rota se necessário
  }


  // --- Métodos Existentes (Modificados para usar 'pages') ---
  toggleCheckbox(model: any, type: string): void {
    if (this.isReadOnly) return;
    // O 'model' agora é uma propriedade DENTRO da página atual
    const currentPageData = this.pages[this.currentPageIndex];
    const targetModel = currentPageData[model]; // Acessa o objeto dentro da página (ex: laudo)

    // Lógica original, mas aplicada ao targetModel
    if (targetModel && targetModel[type]) {
        const otherType = type === 'ok' ? 'nok' : (type === 'nok' ? 'ok' : (type === 'aprovado' ? 'reprovado' : 'aprovado'));
        if (otherType in targetModel) {
            targetModel[otherType] = false;
        }
    } else if (targetModel && typeof targetModel === 'object') {
       // Se o modelo for um objeto (como laudo) mas a propriedade não existir,
       // apenas garante que a outra seja falsa se esta for marcada
       if (targetModel[type]) {
           const otherType = type === 'ok' ? 'nok' : (type === 'nok' ? 'ok' : (type === 'aprovado' ? 'reprovado' : 'aprovado'));
            if (otherType in targetModel) {
                targetModel[otherType] = false;
            }
       }
    }
  }


  toggleCleaningCheckbox(selectedModelKey: string): void {
      if (this.isReadOnly) return;
      const currentPageData = this.pages[this.currentPageIndex];
      this.formConfig.tools.cleaning.options.forEach((option: any) => {
          if (option.model !== selectedModelKey) {
              // Acessa a propriedade na página atual
              currentPageData[option.model] = false;
          }
      });
  }

  removeCurrentPage(): void {
  if (this.isReadOnly) return; // Não permite remover no modo leitura
  if (this.pages.length <= 1) return; // Sempre deixa pelo menos uma página

  // Remove a página atual
  this.pages.splice(this.currentPageIndex, 1);

  // Ajusta o índice da página atual
  if (this.currentPageIndex >= this.pages.length) {
    this.currentPageIndex = this.pages.length - 1;
  }

  // Atualiza as páginas visíveis (se estiver usando paginação)
  this.updateVisiblePages();
}
  updateVisiblePages() {
    throw new Error('Method not implemented.');
  }
  // Removido: O formData original não é mais usado diretamente
  // formData: any = { ... };
}

