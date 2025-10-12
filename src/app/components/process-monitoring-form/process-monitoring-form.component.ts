import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
export class ProcessMonitoringFormComponent {

  // Usando 'any' para simplificar e remover os erros de tipagem
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

  // Usando 'any' aqui também para máxima simplicidade
  formData: any = {
    equipMedicao: { ok: false, nok: false },
    coberturaOxi: { ok: false, nok: false },
    sentidoTorcao: { ok: false, nok: false },
    limpezaSecador: { ok: false, nok: false },
    laudo: { aprovado: false, reprovado: false },
    limpezaTela: false,
    limpezaRosca: false,
    limpezaGeral: false,
    naoFeita: false,
  };

  toggleCheckbox(model: any, type: 'ok' | 'nok' | 'aprovado' | 'reprovado'): void {
    if (model[type]) {
      const otherType = type === 'ok' ? 'nok' : (type === 'nok' ? 'ok' : (type === 'aprovado' ? 'reprovado' : 'aprovado'));
      model[otherType] = false;
    }
  }

  toggleCleaningCheckbox(selectedModel: string): void {
      this.formConfig.tools.cleaning.options.forEach((option: any) => {
          if (option.model !== selectedModel) {
              this.formData[option.model] = false;
          }
      });
  }
}