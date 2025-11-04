import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process-monitoring',
  standalone: true,
  imports: [CommonModule, FormsModule],
 templateUrl: './rmp-009-formulario.component.html',
styleUrls: ['./rmp-009-formulario.component.css']

})
export class ProcessMonitoringComponent {
  items = Array.from({ length: 20 }, () => ({
    codigo: '',
    lote: '',
    aterramento: '',
    planoControle: '',
    diametroMenor: '',
    diametroMaior: '',
    alongamentoInicio: '',
    alongamentoFinal: '',
    oxidacaoInicio: '',
    oxidacaoFinal: '',
    qtdProduzida: '',
    gravacaoInicio: '',
    gravacaoFinal: '',
    falhasSpark: '',
    confereEquip: '',
    turno: '',
    operador: '',
    data: '',
    laudo: ''
  }));
}